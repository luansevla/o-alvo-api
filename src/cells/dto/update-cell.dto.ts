import { PartialType } from '@nestjs/mapped-types';
import { CreateCellDto } from './create-cell.dto';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateAddressDto } from '../../address/dto/update-address.dto';
import { Type } from 'class-transformer';
import { CreateAddressDto } from '../../address/dto/create-address.dto';
import { UpdateAreaDto } from '../../area/dto/update-area.dto';

export class UpdateCellDto extends PartialType(CreateCellDto) {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  nome: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  horario: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  dia_semana: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @ApiProperty({ type: [String] })
  lideres: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @ApiProperty({ type: [String] })
  colideres: string[];

  @IsString({ each: true })
  @IsOptional()
  @ApiProperty({ type: [String] })
  pastor_responsavel: string[];

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @ApiProperty({ type: [String] })
  membros: string[];

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ type: [String] })
  visitas: string[];

  @IsEnum(['Casais', 'Solteiros', 'Solteiras', 'Mista'])
  @ApiProperty({ type: String })
  tipo: string;

  @ApiProperty({ type: UpdateAreaDto })
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateAreaDto)
  area: UpdateAreaDto;

  @IsNotEmpty()
  @ValidateNested()
  @ApiProperty({ type: CreateAddressDto })
  @Type(() => CreateAddressDto)
  address?: CreateAddressDto;

  @IsBoolean()
  @ApiProperty({ type: Boolean })
  ativa: boolean;
}
