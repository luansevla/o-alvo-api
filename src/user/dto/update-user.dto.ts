import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto, UserCellDto } from './create-user.dto';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateCellDto } from '../../cells/dto/update-cell.dto';
import { UpdateAddressDto } from '../../address/dto/update-address.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  document: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty({ type: Date })
  birthDate?: Date;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String })
  contactPhone?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String })
  department?: string;

  @ApiProperty({ type: [UserCellDto], required: false }) // Corrigido para o tipo correto
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UserCellDto) // Garante que o class-transformer entenda os objetos internos
  cells?: UserCellDto[];

  @ValidateNested()
  @Type(() => UpdateAddressDto)
  @IsOptional()
  @ApiProperty({ type: UpdateAddressDto })
  address?: UpdateAddressDto;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ type: Boolean })
  isActive?: boolean;

  @IsEnum([
    'ADMIN',
    'PASTOR',
    'DIÁCONO',
    'SUPERVISOR',
    'COLIDER',
    'ASP. DIÁCONO',
    'LIDER',
    'MEMBRO',
  ])
  @IsOptional()
  @ApiProperty({
    type: String,
    enum: [
      'ADMIN',
      'PASTOR',
      'DIÁCONO',
      'SUPERVISOR',
      'COLIDER',
      'ASP. DIÁCONO',
      'LIDER',
      'MEMBRO',
    ],
    required: false,
    example: 'MEMBRO',
  })
  accessLevel?: string;
}
