import { MiddlewareConsumer, Module } from '@nestjs/common';
import { HttpLoggerMiddleware } from '../common/logger/http-logger-middleware';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { TransactionModule } from './transaction/transaction.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, PrismaModule, TransactionModule, UserModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
