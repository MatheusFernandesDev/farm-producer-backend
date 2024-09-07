import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablesFarmProducers1725422921087
  implements MigrationInterface
{
  name = 'CreateTablesFarmProducers1725422921087';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.query(`
        CREATE TABLE "farm_producer" (
          "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "cpf_cnpj" character varying(20) NOT NULL,
          "producer_name" character varying(255) NOT NULL,
          "farm_name" character varying(255) NOT NULL,
          "city" character varying(255) NOT NULL,
          "state" character varying(255) NOT NULL,
          "total_area_hectares" double precision NOT NULL,
          "cultivated_area_hectares" double precision NOT NULL,
          "vegetation_area_hectares" double precision NOT NULL,
          "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
          "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
          CONSTRAINT "pk_farm_producer" PRIMARY KEY ("id")
        )
      `);
    await queryRunner.query(`
        CREATE TABLE "crops_planted" (
          "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "crop_name" character varying(255) NOT NULL,
          "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
          "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
          CONSTRAINT "pk_crops_planted" PRIMARY KEY ("id")
        
         
        )
      `);
    await queryRunner.query(`
        CREATE TABLE "cultural_producers" (
          "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "id_producer" uuid NOT NULL,
          "id_crops" uuid NOT NULL,
          "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
          "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
          CONSTRAINT "pk_cultural_producers" PRIMARY KEY ("id")
        
         
        )
      `);

    await queryRunner.query(`
        INSERT INTO "crops_planted" ("id", "crop_name")
        VALUES 
        (uuid_generate_v4(), 'Soja'),
        (uuid_generate_v4(), 'Milho'),
        (uuid_generate_v4(), 'Algodão'),
        (uuid_generate_v4(), 'Café'),
        (uuid_generate_v4(), 'Cana de Açúcar')
     `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "farm_producer"`);
    await queryRunner.query(`DROP TABLE "crops_planted"`);
    await queryRunner.query(`DROP TABLE "cultural_producers"`);
  }
}
