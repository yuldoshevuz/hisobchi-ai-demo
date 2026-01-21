import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserInputDto } from './dtos/register-user-input.dto';
import { LoginUserInputDto } from './dtos/login-user-input.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() data: RegisterUserInputDto) {
    return this.authService.register(data);
  }

  @Post('login')
  async login(@Body() data: LoginUserInputDto) {
    return this.authService.login(data);
  }
}
