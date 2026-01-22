import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IUser } from 'src/interfaces/user';
import { LinkingUserInputDto } from './dtos/linkding-user-input.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async linkUser(user: IUser, data: LinkingUserInputDto): Promise<IUser> {
    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        telegram_id: data.telegram_id,
      },
      omit: { password: true },
    });

    return updatedUser;
  }

  async unlinkUser(user: IUser): Promise<IUser> {
    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        telegram_id: null,
      },
      omit: { password: true },
    });

    return updatedUser;
  }
}
