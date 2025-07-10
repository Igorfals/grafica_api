import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'joao silva',
  })
  @IsNotEmpty({ message: 'O campo name não pode estar vazio' })
  @IsString({ message: 'O campo name deve ser uma string' })
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
  name: string;

  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'joaosilva@teste.com',
  })
  @IsNotEmpty({ message: 'O campo email não pode estar vazio' })
  @IsString({ message: 'O campo email deve ser uma string' })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário, com no mínimo 8 caracteres',
    example: 'senhaSegura123',
    minLength: 8,
  })
  @IsNotEmpty({ message: 'O campo senha não pode estar vazio' })
  @IsString({ message: 'O campo senha deve ser uma string' })
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
  password: string;
}
