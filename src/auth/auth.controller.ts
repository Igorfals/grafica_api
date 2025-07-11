import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/auth-request';
import { IsPublic } from './decorators/is-public-decorator';
import { ApiBody } from '@nestjs/swagger';
import { LoginRequestBody } from './models/login-request-body';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({
    description: 'Login credentials',
    type: LoginRequestBody,
    examples: {
      login: {
        summary: 'Exemplo de login',
        value: {
          email: 'usuario@email.com',
          password: 'senha123',
        },
      },
    },
  })
  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }
}
