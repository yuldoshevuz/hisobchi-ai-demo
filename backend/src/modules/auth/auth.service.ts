import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from 'src/interfaces/jwt-payload';
import { RegisterUserInputDto } from './dtos/register-user-input.dto';
import { VALIDATION_MESSAGES } from 'src/common/constants/validation-messages';
import * as bcrypt from 'bcryptjs';
import { PASSWORD_HASH_SALT } from 'src/common/constants';
import { LoginUserInputDto } from './dtos/login-user-input.dto';
import { IUser } from 'src/interfaces/user';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: RegisterUserInputDto) {
    const { email, name, password, tariff } = data;

    const userExists = await this.prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new BadRequestException(VALIDATION_MESSAGES.userAlreadyExists);
    }

    const hashedPassword = await bcrypt.hash(password, PASSWORD_HASH_SALT);

    const user = await this.prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        tariff,
      },
    });

    const accessToken = await this.generateToken(user);

    return { user_id: user.id, access_token: accessToken };
  }

  async login(data: LoginUserInputDto) {
    const { email, password } = data;

    const userExists = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!userExists) {
      throw new BadRequestException(VALIDATION_MESSAGES.invalidCredentials);
    }

    const isPasswordValid = await bcrypt.compare(password, userExists.password);

    if (!isPasswordValid) {
      throw new BadRequestException(VALIDATION_MESSAGES.invalidCredentials);
    }

    const accessToken = await this.generateToken(userExists);

    return { user_id: userExists.id, access_token: accessToken };
  }

  async verifyToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync<IJwtPayload>(token);

      return payload;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async generateToken(user: User): Promise<string> {
    const { password, ...rest } = user;

    const accessToken = await this.jwtService.signAsync({ user: rest });

    return accessToken;
  }
}
