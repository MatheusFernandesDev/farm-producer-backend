import { PartialType } from '@nestjs/swagger';

import { CreateProducerFarmDto } from './create-producer-farm.dto';

export class UpdateProducerFarmDto extends PartialType(CreateProducerFarmDto) {}
