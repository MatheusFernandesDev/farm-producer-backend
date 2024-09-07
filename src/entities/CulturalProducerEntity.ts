import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProducerFarmEntity } from './ProducerFarmEntity';
import { CropsPlantedEntity } from './CropsPlantedEntity';

@Entity('cultural_producers')
export class CulturalProducerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => ProducerFarmEntity,
    (ProducerFarmEntity) => ProducerFarmEntity.culturalProducers,
  )
  @JoinColumn({ name: 'id_producer' })
  farmProducerEntity: ProducerFarmEntity;

  @ManyToOne(
    () => CropsPlantedEntity,
    (cropsPlantedEntity) => cropsPlantedEntity.culturalProducerEntitys,
  )
  @JoinColumn({ name: 'id_crops' })
  cropsPlantedEntity: CropsPlantedEntity;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;
}
