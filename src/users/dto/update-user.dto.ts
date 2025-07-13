import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  MinLength,
  IsEmail,
  IsInt,
  Min,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'ID do usuário',
    example: 1,
  })
  @IsOptional()
  @IsInt({ message: 'O campo id_user deve ser um número inteiro' })
  @Min(1, { message: 'O id_user deve ser maior que zero' })
  id_user?: number;

  @ApiProperty({
    description: 'Nome do usuário',
    example: 'joao silva',
  })
  @IsOptional()
  @IsString({ message: 'O campo name deve ser uma string' })
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
  name: string;

  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'joaosilva@teste.com',
  })
  @IsOptional()
  @IsEmail({}, { message: 'O campo email deve ser um e-mail válido' })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário, com no mínimo 8 caracteres',
    example: 'senhaSegura123',
    minLength: 8,
  })
  @IsOptional()
  @IsString({ message: 'O campo senha deve ser uma string' })
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
  password: string;
}
