import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CropsPlantedController } from './crops-planted.controller';
import { CropsPlantedEntity } from '../../../entities';
import {
  ListAllCropsPlantedService,
  CreateCropPlantedService,
} from './services';

@Module({
  imports: [TypeOrmModule.forFeature([CropsPlantedEntity])],
  controllers: [CropsPlantedController],
  providers: [ListAllCropsPlantedService, CreateCropPlantedService],
})
export class CropsPlantedModule {}
