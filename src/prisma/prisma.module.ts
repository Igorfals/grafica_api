import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(configService: ConfigService) {
    const dbUrl = configService.get<string>('DATABASE_URL');
    if (!dbUrl) throw new Error('DATABASE_URL não definida');
    super({ datasources: { db: { url: dbUrl } } });
  }
}

export class PrismaModule {}
