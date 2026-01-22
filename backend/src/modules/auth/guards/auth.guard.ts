import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { RequestWithUser } from 'src/interfaces/request-with-user';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const token = this.extractTokenFromHeader(request);

    const telegramId = request.headers['x-telegram-id'];

    if (!token || !telegramId) {
      throw new UnauthorizedException();
    }

    const payload = await this.authService.verifyToken(token);

    if (!payload || !payload.user) {
      throw new UnauthorizedException();
    }

    const user = await this.prisma.user.findUnique({
      where: { id: payload.user.id },
      omit: { password: true },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    if (user.telegram_id && user.telegram_id !== telegramId) {
      throw new ForbiddenException();
    }

    request.user = user;

    return true;
  }

  private extractTokenFromHeader(request: RequestWithUser): string | null {
    const authorization = request.headers.authorization;

    if (!authorization) return null;

    const [_, token] = authorization.split('Bearer ');

    return token || null;
  }
}
