import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserInputDto {
  @ApiProperty({ type: 'string', example: 'mail@example.com' })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: 'string', example: 'password123' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
