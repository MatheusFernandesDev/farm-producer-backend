import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import {
  CropsPlantedEntity,
  CulturalProducerEntity,
  ProducerFarmEntity,
} from '../../../../entities';
import { CreateProducerFarmDto } from '../dto';
import { cpf as cpfValidator, cnpj as cnpjValidator } from 'cpf-cnpj-validator';

@Injectable()
export class CreateProducerFarmService {
  constructor(
    @InjectRepository(ProducerFarmEntity)
    private readonly producerFarmRepository: Repository<ProducerFarmEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async execute(params: {
    dto: CreateProducerFarmDto;
  }): Promise<ProducerFarmEntity> {
    const { dto } = params;

    // Validação CPF/CNPJ
    if (
      !cpfValidator.isValid(dto.cpf_cnpj) &&
      !cnpjValidator.isValid(dto.cpf_cnpj)
    ) {
      throw new BadRequestException('CPF/CNPJ inválido');
    }

    // Verificação de área
    const totalArea =
      dto.cultivated_area_hectares + dto.vegetation_area_hectares;
    if (totalArea > dto.total_area_hectares) {
      throw new BadRequestException(
        'A soma da área agricultável e vegetação não pode ser maior que a área total',
      );
    }

    return await this.dataSource.transaction(async (manager) => {
      const existingProducer = await manager.findOne(ProducerFarmEntity, {
        where: { cpf_cnpj: dto.cpf_cnpj },
      });
      if (existingProducer) {
        throw new ConflictException('CPF/CNPJ já cadastrado.');
      }

      const newProducerFarm = new ProducerFarmEntity();
      newProducerFarm.cpf_cnpj = dto.cpf_cnpj;
      newProducerFarm.producer_name = dto.producer_name;
      newProducerFarm.farm_name = dto.farm_name;
      newProducerFarm.city = dto.city;
      newProducerFarm.state = dto.state;
      newProducerFarm.total_area_hectares = dto.total_area_hectares;
      newProducerFarm.cultivated_area_hectares = dto.cultivated_area_hectares;
      newProducerFarm.vegetation_area_hectares = dto.vegetation_area_hectares;

      // Salvar o produtor rural
      const savedProducer = await manager.save(newProducerFarm);

      // Associar culturas plantadas
      const culturalProducerPromises = dto.crops.map(async (cropId) => {
        const crop = await manager.findOne(CropsPlantedEntity, {
          where: { id: cropId },
        });
        if (!crop) {
          throw new BadRequestException(
            `Cultura com id ${cropId} não encontrada.`,
          );
        }

        const culturalProducer = new CulturalProducerEntity();
        culturalProducer.farmProducerEntity = savedProducer;
        culturalProducer.cropsPlantedEntity = crop;

        return manager.save(culturalProducer);
      });

      await Promise.all(culturalProducerPromises);

      return savedProducer;
    });
  }
}
