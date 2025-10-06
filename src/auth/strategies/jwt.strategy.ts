import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
// 1. Importe o ConfigService
import { ConfigService } from '@nestjs/config';
import { UserFromJwt } from '../models/user-from-jtw';
import { UserPayload } from '../models/user-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // 2. Injete o ConfigService no construtor
  constructor(private readonly configService: ConfigService) {
    // 3. Obtenha a variável de ambiente de forma segura
    const jwtSecret = configService.get<string>('JWT_SECRET');

    if (!jwtSecret) {
      // Mensagem de erro mais clara para o deploy
      throw new Error(
        'JWT_SECRET não está definido. Verifique suas variáveis de ambiente no Railway.',
      );
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret, // Usa o valor seguro lido pelo ConfigService
    });
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async validate(payload: UserPayload): Promise<UserFromJwt> {
    if (!payload.sub) {
      throw new Error('Invalid JWT payload: sub is undefined');
    }

    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
    };
  }
}
