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
      envFilePath: '.env', // caminho do seu arquivo
      isGlobal: true, // disponível no app todo
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
