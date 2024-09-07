import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCropPlantedDto {
  @ApiProperty({
    example: 'Milho',
    description: 'Nome da Cultura Plantada',
  })
  @IsString({ message: 'O nome da Cultura plantada deve ser de caracteres' })
  @IsNotEmpty({ message: 'O nome da Cultura plantada é um campo obrigatório' })
  crop_name: string;
}
