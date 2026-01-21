import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_AUTH } from '../common/constants';

export const swaggerSetup = (app: NestExpressApplication): void => {
  const configuration = new DocumentBuilder()
    .setTitle('Hisobchi AI (Demo)')
    .setDescription('Hisobchi AI API Description')
    .setContact(
      'Muhammadali',
      'https://yuldoshev.uz',
      'mukhammadaliweb@gmail.com',
    )
    .setVersion('0.0.1')
    .addBearerAuth({ type: 'http', scheme: 'bearer' }, SWAGGER_AUTH)
    .build();

  const documentFactory = SwaggerModule.createDocument(app, configuration);

  SwaggerModule.setup('api/docs', app, documentFactory);
};
