import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  email: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  password: string;
}
