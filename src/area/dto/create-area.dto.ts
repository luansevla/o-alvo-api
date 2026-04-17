import { IsString, IsArray, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAreaDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  nome: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  cidade: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String })
  sigla: string;

  @IsArray()
  @IsOptional()
  @ApiProperty({ type: [String] })
  pastores_gestores: string[];
}
