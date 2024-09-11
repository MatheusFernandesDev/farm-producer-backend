import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreateProducerFarmDto {
  @ApiProperty({ example: '12345678901', description: 'CPF/CNPJ do Produtor' })
  @IsString({ message: 'O CPF/CNPJ deve ser de caracteres' })
  @IsNotEmpty({ message: 'O CPF/CNPJ é um campo obrigatório' })
  cpf_cnpj: string;

  @ApiProperty({ example: 'Matheus', description: 'Nome do Produtor' })
  @IsString({ message: 'O nome do Produtor deve ser de caracteres' })
  @IsNotEmpty({ message: 'O nome do Produtor é um campo obrigatório' })
  producer_name: string;

  @ApiProperty({
    example: 'Fazenda do Matheus',
    description: 'Nome da Fazenda',
  })
  @IsString({ message: 'O nome da Fazenda deve ser de caracteres' })
  @IsNotEmpty({ message: 'O nome da Fazenda é um campo obrigatório' })
  farm_name: string;

  @ApiProperty({ example: 'São Paulo', description: 'Cidade' })
  @IsString({ message: 'A cidade deve ser de caracteres' })
  @IsNotEmpty({ message: 'A cidade é um campo obrigatório' })
  city: string;

  @ApiProperty({ example: 'SP', description: 'Estado' })
  @IsString({ message: 'O estado deve ser de caracteres' })
  @IsNotEmpty({ message: 'O estado é um campo obrigatório' })
  state: string;

  @ApiProperty({ example: 100, description: 'Área total em hectares' })
  @IsNumber({}, { message: 'A área total deve ser um número' })
  @IsNotEmpty({ message: 'A área total é um campo obrigatório' })
  total_area_hectares: number;

  @ApiProperty({ example: 50, description: 'Área cultivada em hectares' })
  @IsNumber({}, { message: 'A área cultivada deve ser um número' })
  cultivated_area_hectares: number;

  @ApiProperty({ example: 20, description: 'Área de vegetação em hectares' })
  @IsNumber({}, { message: 'A área de vegetação deve ser um número' })
  vegetation_area_hectares: number;

  @ApiProperty({
    example: [
      '308806c1-ec34-41d3-af99-20c1228f888d',
      '76475e2c-8128-402f-8603-92d7c9561ff5',
    ],
    description: 'Array de IDs das culturas plantadas',
  })
  @IsArray()
  @IsNotEmpty({ message: 'As culturas plantadas são obrigatórias' })
  crops: string[];
}
