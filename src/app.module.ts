import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // ← importar
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth-guard';
import { OrderModule } from './order/order.module';
import { RedisModule } from './common/redis/redis.module';
import { PrismaModule } from './prisma/prisma.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'], // tenta .env.local primeiro, depois .env
      isGlobal: true, // disponível no app todo
      ignoreEnvFile: process.env.NODE_ENV === 'production', // ignora .env em produção (Railway)
      cache: true, // cache das variáveis para melhor performance
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    OrderModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
