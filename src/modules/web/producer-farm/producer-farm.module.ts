import { Module } from '@nestjs/common';

import {
  CreateProducerFarmService,
  DeleteProducerFarmService,
  ListAllProducerFarmService,
  UpdateProducerFarmService,
  DashboardProducerFarmService,
} from './services';
import { ProducerFarmController } from './producer-farm-controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CulturalProducerEntity, ProducerFarmEntity } from '../../../entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProducerFarmEntity, CulturalProducerEntity]),
  ],
  controllers: [ProducerFarmController],
  providers: [
    ListAllProducerFarmService,
    CreateProducerFarmService,
    UpdateProducerFarmService,
    DeleteProducerFarmService,
    DashboardProducerFarmService,
  ],
})
export class ProducerFarmModule {}
