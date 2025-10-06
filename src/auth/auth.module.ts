import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { LoginValidationMiddleware } from './middelwares/login-validation.middleware';

// 1. Importe o ConfigModule e o ConfigService
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    // 2. Configure o JwtModule usando registerAsync() para injetar o ConfigService
    JwtModule.registerAsync({
      // Importe o ConfigModule para que ele possa ser injetado abaixo
      imports: [ConfigModule],
      // Use useFactory para carregar as opções de forma assíncrona
      useFactory: (configService: ConfigService) => ({
        // Carrega JWT_SECRET (agora de forma segura)
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          // Carrega o tempo de expiração do ambiente, com um fallback
          expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '30d',
        },
      }),
      // Injeta o ConfigService no useFactory
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('login');
  }
}
