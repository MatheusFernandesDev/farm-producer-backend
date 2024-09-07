import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { CulturalProducerEntity } from './CulturalProducerEntity';

@Entity('crops_planted')
export class CropsPlantedEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  crop_name: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;

  @OneToMany(
    () => CulturalProducerEntity,
    (culturalProducerEntity) => culturalProducerEntity.cropsPlantedEntity,
  )
  culturalProducerEntitys: CulturalProducerEntity[];
}
