import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CropsPlantedEntity } from '../../../../entities';

@Injectable()
export class ListAllCropsPlantedService {
  constructor(
    @InjectRepository(CropsPlantedEntity)
    private readonly cropsPlantedRepository: Repository<CropsPlantedEntity>,
  ) {}

  async execute() {
    return this.cropsPlantedRepository.find({
      select: {
        id: true,
        crop_name: true,
      },
    });
  }
}
