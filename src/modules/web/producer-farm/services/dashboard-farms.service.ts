import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProducerFarmEntity } from '../../../../entities';
import { CulturalProducerEntity } from '../../../../entities';

@Injectable()
export class DashboardProducerFarmService {
  constructor(
    @InjectRepository(ProducerFarmEntity)
    private readonly farmProducerRepository: Repository<ProducerFarmEntity>,

    @InjectRepository(CulturalProducerEntity)
    private readonly culturalProducerRepository: Repository<CulturalProducerEntity>,
  ) {}

  async execute() {
    // Total de fazendas
    const totalFarms = await this.farmProducerRepository.count();

    // Total de hectares (somando o total de hectares de todas as fazendas)
    const totalHectares = await this.farmProducerRepository
      .createQueryBuilder('farm_producer')
      .select('SUM(farm_producer.total_area_hectares)', 'totalHectares')
      .getRawOne();

    // Gráfico de pizza por estado
    const farmsByState = await this.farmProducerRepository
      .createQueryBuilder('farm_producer')
      .select('farm_producer.state, COUNT(farm_producer.id) as count')
      .groupBy('farm_producer.state')
      .getRawMany();

    // Gráfico de pizza por cultura
    const cropsByType = await this.culturalProducerRepository
      .createQueryBuilder('cultural_producers')
      .innerJoinAndSelect(
        'cultural_producers.cropsPlantedEntity',
        'crops_planted',
      )
      .getRawMany();

    const cropCounts = {};
    cropsByType.forEach((crop) => {
      const cropName = crop.crops_planted_crop_name;
      if (!cropCounts[cropName]) {
        cropCounts[cropName] = 0;
      }
      cropCounts[cropName]++;
    });

    // Gráfico de pizza por uso do solo (agricultável vs vegetação)
    const landUsage = await this.farmProducerRepository
      .createQueryBuilder('farm_producer')
      .select('SUM(farm_producer.cultivated_area_hectares)', 'cultivated')
      .addSelect('SUM(farm_producer.vegetation_area_hectares)', 'vegetation')
      .getRawOne();

    return {
      totalFarms,
      totalHectares: totalHectares.totalHectares || 0,
      farmsByState,
      cropCounts,
      landUsage: {
        Agricultável: landUsage.cultivated || 0,
        Vegetação: landUsage.vegetation || 0,
      },
    };
  }
}
