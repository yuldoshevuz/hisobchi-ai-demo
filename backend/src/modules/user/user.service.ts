import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IUser } from 'src/interfaces/user';
import { LinkingUserInputDto } from './dtos/linkding-user-input.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async linkUser(user: IUser, data: LinkingUserInputDto) {
    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        telegram_id: data.telegram_id,
      },
    });

    return updatedUser;
  }

  async unlinkUser(user: IUser) {
    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        telegram_id: null,
      },
    });

    return updatedUser;
  }
}
