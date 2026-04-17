import { PartialType } from '@nestjs/mapped-types';
import { CreateAreaDto } from './create-area.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAreaDto extends PartialType(CreateAreaDto) {
  @IsString()
  @IsString()
  nome: string;

  @IsString()
  @IsNotEmpty()
  cidade: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String })
  sigla: string;

  @IsString()
  @IsString({ each: true })
  pastores_gestores: string[];
}
