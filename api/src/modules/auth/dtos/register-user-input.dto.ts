import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Tariff } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterUserInputDto {
  @ApiProperty({ type: 'string', example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: 'string', example: 'mail@example.com' })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: 'string', example: 'password123' })
  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiPropertyOptional({ type: 'string', enum: Tariff, example: Tariff.pro })
  @IsEnum(Tariff)
  @IsOptional()
  tariff?: Tariff;
}
