import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CropsPlantedEntity } from '../../../../entities';
import { CreateCropPlantedDto } from '../dto';

@Injectable()
export class CreateCropPlantedService {
  constructor(
    @InjectRepository(CropsPlantedEntity)
    private readonly cropsPlantedRepository: Repository<CropsPlantedEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async execute(params: {
    dto: CreateCropPlantedDto;
  }): Promise<CropsPlantedEntity> {
    const { dto } = params;
    return await this.dataSource.transaction(async (manager) => {
      const newCropPlanted = new CropsPlantedEntity();
      newCropPlanted.crop_name = dto.crop_name;
      return await manager.save(newCropPlanted);
    });
  }
}
