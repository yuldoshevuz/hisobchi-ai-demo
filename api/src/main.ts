import { NestFactory } from '@nestjs/core';
import { HTTP_PORT } from './config/environments';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import cors from 'cors';
import { swaggerSetup } from './config/swagger.setup';
import { logger } from './common/logger';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cors());
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  swaggerSetup(app);

  await app.listen(HTTP_PORT);
  logger.info(`Server is running on: http://localhost:${HTTP_PORT}`);
}
bootstrap();
