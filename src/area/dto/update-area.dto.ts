import { PartialType } from '@nestjs/mapped-types';
import { CreateAreaDto } from './create-area.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAreaDto extends PartialType(CreateAreaDto) {
  @IsString()
  @IsString()
  nome: string;

  @IsString()
  @IsNotEmpty()
  cidade: string;

  @IsString()
  @IsString({ each: true })
  pastores_gestores: string[];
}
