import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { USER } from 'src/common/decorators/user.decorator';
import type { IUser } from 'src/interfaces/user';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SWAGGER_AUTH } from 'src/common/constants';
import { Auth } from '../auth/decorators/auth.decorator';

@ApiBearerAuth(SWAGGER_AUTH)
@Auth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async getMe(@USER() user: IUser) {
    return user;
  }
}
