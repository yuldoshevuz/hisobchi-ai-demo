import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { logger } from '.';

export class HttpLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    res.on('finish', async () => {
      const { method, originalUrl, headers, body } = req;
      const { statusCode } = res;

      logger.info(
        `Request: ${method} ${originalUrl} ${statusCode} - \n\nHeaders: ${JSON.stringify(headers)} \n\nBody: ${JSON.stringify(body)}`,
      );
    });

    next();
  }
}
