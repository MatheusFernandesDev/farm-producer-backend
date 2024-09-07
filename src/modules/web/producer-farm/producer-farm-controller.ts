import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  ListAllProducerFarmService,
  CreateProducerFarmService,
  UpdateProducerFarmService,
  DeleteProducerFarmService,
  DashboardProducerFarmService,
} from './services';
import { CreateProducerFarmDto, UpdateProducerFarmDto } from './dto';

@Controller('producers')
export class ProducerFarmController {
  constructor(
    private readonly listAllProducerFarmService: ListAllProducerFarmService,
    private readonly createProducerFarmService: CreateProducerFarmService,
    private readonly updateProducerFarmService: UpdateProducerFarmService,
    private readonly deleteProducerFarmService: DeleteProducerFarmService,
    private readonly dashboardProducerFarmService: DashboardProducerFarmService,
  ) {}

  @ApiTags('Producers')
  @ApiOperation({ summary: 'Listar Produtores Ru' })
  @Get('/all')
  async getAllProducers() {
    return this.listAllProducerFarmService.execute();
  }

  @ApiTags('Producers')
  @ApiOperation({ summary: 'Criar Produtor Rural' })
  @Post()
  async createProducerFarm(@Body() dto: CreateProducerFarmDto) {
    return this.createProducerFarmService.execute({ dto });
  }

  @ApiTags('Producers')
  @ApiOperation({ summary: 'Atualizar Produtor Rural' })
  @Put(':id')
  async updateProducerFarm(
    @Param('id') id: string,
    @Body() dto: UpdateProducerFarmDto,
  ) {
    return this.updateProducerFarmService.execute({ id, dto });
  }

  @ApiTags('Producers')
  @ApiOperation({ summary: 'Deletar Produtor Rural' })
  @Delete(':id')
  async deleteProducerFarm(@Param('id') id: string) {
    return this.deleteProducerFarmService.execute({ id });
  }

  @ApiTags('Producers')
  @ApiOperation({ summary: 'Dashboard Produtor Rural' })
  @Get('/dashboard')
  async dashboardProducerFarm() {
    return this.dashboardProducerFarmService.execute();
  }
}
