import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { DATABASE_URL } from 'src/config/environments';
import { PrismaPg } from '@prisma/adapter-pg';
import { logger } from 'src/common/logger';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const pool = new Pool({
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });

    const adapter = new PrismaPg(pool);

    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();

    logger.info('Postgres connected');
  }

  async onModuleDestroy() {
    await this.$disconnect();

    logger.info('Postgres disconnected');
  }
}
