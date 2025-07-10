import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthResponseDto } from './auth.dto';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  private jwtExpirationTimeInSeconds: number;
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTimeInSeconds =
      this.configService.get<number>('JWT_EXPIRATION_TIME') || 86400;
  }
  async singIn(email: string, password: string): Promise<AuthResponseDto> {
    const foundUser = await this.usersService.findByEmail(email);
    if (!foundUser || !bcryptCompareSync(password, foundUser.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: foundUser.id, name: foundUser.name };
    const token = this.jwtService.sign(payload);
    return {
      token,
      expiresIn: this.jwtExpirationTimeInSeconds,
    };
  }
}
