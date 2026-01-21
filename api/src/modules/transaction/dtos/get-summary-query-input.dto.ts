import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';

export class GetSummaryQueryInputDto {
  @ApiPropertyOptional({
    type: 'string',
    format: 'date',
    example: '2026-01-01',
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  from: Date;

  @ApiPropertyOptional({
    type: 'string',
    format: 'date',
    example: '2026-01-31',
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  to: Date;
}
