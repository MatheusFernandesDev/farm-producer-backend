import { Module } from '@nestjs/common';
import { ProducerFarmModule } from './producer-farm/producer-farm.module';
import { CropsPlantedModule } from './crops-planted/crops-planted.module';

@Module({ imports: [ProducerFarmModule, CropsPlantedModule] })
export class WebModule {}
