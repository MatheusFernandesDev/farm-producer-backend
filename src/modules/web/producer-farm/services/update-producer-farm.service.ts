import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProducerFarmEntity } from '../../../../entities';
import { UpdateProducerFarmDto } from '../dto';
import { cpf as cpfValidator, cnpj as cnpjValidator } from 'cpf-cnpj-validator';

@Injectable()
export class UpdateProducerFarmService {
  constructor(
    @InjectRepository(ProducerFarmEntity)
    private readonly farmProducerRepository: Repository<ProducerFarmEntity>,
  ) {}

  async execute(params: {
    id: string;
    dto: UpdateProducerFarmDto;
  }): Promise<ProducerFarmEntity> {
    const { dto, id } = params;
    // Buscar o produtor pelo ID
    const producer = await this.farmProducerRepository.findOne({
      where: { id },
    });

    if (!producer) {
      throw new NotFoundException('Produtor rural não encontrado.');
    }

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

    // Atualizar os campos do produtor
    producer.cpf_cnpj = dto.cpf_cnpj;
    producer.producer_name = dto.producer_name;
    producer.farm_name = dto.farm_name;
    producer.city = dto.city;
    producer.state = dto.state;
    producer.total_area_hectares = dto.total_area_hectares;
    producer.cultivated_area_hectares = dto.cultivated_area_hectares;
    producer.vegetation_area_hectares = dto.vegetation_area_hectares;

    // Salvar as atualizações
    return await this.farmProducerRepository.save(producer);
  }
}
