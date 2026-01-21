import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class LinkingUserInputDto {
  @ApiProperty({ example: '12345678' })
  @IsNumberString()
  @IsNotEmpty()
  telegram_id: string;
}
