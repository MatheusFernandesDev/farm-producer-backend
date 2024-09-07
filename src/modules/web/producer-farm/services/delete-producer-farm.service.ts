import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProducerFarmEntity } from '../../../../entities';

@Injectable()
export class DeleteProducerFarmService {
  constructor(
    @InjectRepository(ProducerFarmEntity)
    private readonly farmProducerRepository: Repository<ProducerFarmEntity>,
  ) {}

  async execute(params: { id: string }): Promise<void> {
    const { id } = params;

    const producer = await this.farmProducerRepository.findOne({
      where: { id },
    });

    if (!producer) {
      throw new NotFoundException('Produtor rural não encontrado.');
    }

    await this.farmProducerRepository.remove(producer);
  }
}
