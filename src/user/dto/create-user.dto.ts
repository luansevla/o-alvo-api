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
import { CreateCellDto } from '../../cells/dto/create-cell.dto';
import { CreateAddressDto } from '../../address/dto/create-address.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserCellDto {
  @ApiProperty({ description: 'ID da Célula' })
  @IsString()
  @IsNotEmpty()
  cellId: string; // Este nome deve ser IDÊNTICO ao do Schema do Mongoose

  @ApiProperty({ description: 'Cargo na célula', example: 'Líder' })
  @IsString()
  @IsOptional()
  role?: string;
}

export class CreateUserDto {
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

  @IsNotEmpty()
  @ValidateNested()
  @ApiProperty({ type: CreateAddressDto })
  @Type(() => CreateAddressDto)
  address?: CreateAddressDto;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ type: Boolean })
  isActive?: boolean;

  @IsEnum(['ADMIN', 'PASTOR', 'DIACONO', 'LIDER', 'MEMBRO'])
  @IsOptional()
  @ApiProperty({
    type: String,
    enum: ['ADMIN', 'PASTOR', 'DIÁCONO', 'SUPERVISOR', 'COLIDER', 'ASP. DIÁCONO', 'LIDER', 'MEMBRO'],
    required: false,
    example: 'MEMBRO',
  })
  accessLevel?: string;
}
