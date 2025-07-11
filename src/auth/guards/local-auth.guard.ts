import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest<TUser = any>(
    err: any,
    user: TUser,
    _info: any,
    _context: ExecutionContext,
    _status?: any,
  ): TUser {
    if (err || !user) {
      throw new UnauthorizedException(
        err instanceof Error ? err.message : 'Erro desconhecido',
      );
    }
    // Verifica o status da autenticação (caso seja relevante para customização)
    if (_status === 401) {
      console.log('Tentativa de login não autorizada');
    }
    return user;
  }
}
