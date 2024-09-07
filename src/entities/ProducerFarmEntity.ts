import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { CulturalProducerEntity } from './CulturalProducerEntity';

@Entity('farm_producer')
export class ProducerFarmEntity {
  static createQueryBuilder(arg0: string) {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 20 })
  cpf_cnpj: string;

  @Column({ type: 'varchar', length: 255 })
  producer_name: string;

  @Column({ type: 'varchar', length: 255 })
  farm_name: string;

  @Column({ type: 'varchar', length: 255 })
  city: string;

  @Column({ type: 'varchar', length: 255 })
  state: string;

  @Column({ type: 'double precision' })
  total_area_hectares: number;

  @Column({ type: 'double precision' })
  cultivated_area_hectares: number;

  @Column({ type: 'double precision' })
  vegetation_area_hectares: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;

  @OneToMany(
    () => CulturalProducerEntity,
    (CulturalProducer) => CulturalProducer.farmProducerEntity,
  )
  culturalProducers: CulturalProducerEntity[];
}
