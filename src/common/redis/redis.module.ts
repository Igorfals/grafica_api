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
      useFactory: (configService: ConfigService) => {
        return new Redis({
          host: configService.get<string>('REDISHOST'),
          port: configService.get<number>('REDISPORT'),
          password: configService.get<string>('REDIS_PASSWORD')
        });
      },
    },
  ],
  exports: ['REDIS'],
})
export class RedisModule {}
