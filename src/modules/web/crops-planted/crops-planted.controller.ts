import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  ListAllCropsPlantedService,
  CreateCropPlantedService,
} from './services';
import { CreateCropPlantedDto } from './dto';

@Controller('crops-planted')
export class CropsPlantedController {
  constructor(
    private readonly listAllCropsPlantedService: ListAllCropsPlantedService,
    private readonly createCropPlantedService: CreateCropPlantedService,
  ) {}

  @ApiTags('Crops Planted')
  @ApiOperation({ summary: 'Listar Culturas Plantadas' })
  @Get('/all')
  async getAllCrops() {
    return this.listAllCropsPlantedService.execute();
  }

  @ApiTags('Crops Planted')
  @ApiOperation({ summary: 'Criar Cultura Plantada' })
  @Post()
  async createCrop(@Body() dto: CreateCropPlantedDto) {
    return this.createCropPlantedService.execute({ dto });
  }
}
