import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TransactionType } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateTransactionInputDto {
  @ApiProperty({ type: 'string', enum: TransactionType })
  @IsEnum(TransactionType)
  @IsNotEmpty()
  type: TransactionType;

  @ApiProperty({ type: 'number', example: 100 })
  @IsPositive()
  @IsNumber({ allowNaN: false })
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ type: 'string', example: 'food' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiPropertyOptional({ type: 'string', example: 'nonushta' })
  @IsString()
  @IsOptional()
  description?: string;
}
