import { Global, Module } from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'REDIS',
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const redisUrl = configService.get<string>('REDIS_URL');

        if (!redisUrl) {
          throw new Error(
            '❌ Variável REDIS_URL não encontrada! Certifique-se de que ela está definida nas variáveis de ambiente.'
          );
        }

        return new Redis(redisUrl);
      },
    },
  ],
  exports: ['REDIS'],
})
export class RedisModule {}
