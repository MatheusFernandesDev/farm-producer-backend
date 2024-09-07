import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProducerFarmEntity } from '../../../../entities/ProducerFarmEntity';

@Injectable()
export class ListAllProducerFarmService {
  constructor(
    @InjectRepository(ProducerFarmEntity)
    private readonly producerFarmRepository: Repository<ProducerFarmEntity>,
  ) {}

  async execute() {
    const results = await this.producerFarmRepository
    .createQueryBuilder('producer')
    .leftJoinAndSelect('producer.culturalProducers', 'culturalProducer')
    .leftJoinAndSelect('culturalProducer.cropsPlantedEntity', 'crop')
    .getMany();
  
  const formattedResults = results.map((producer) => ({
    ...producer,
    culturalProducers: producer.culturalProducers.map((culturalProducer) => culturalProducer.cropsPlantedEntity.crop_name),
  }));
  
  return formattedResults;
  }
}
