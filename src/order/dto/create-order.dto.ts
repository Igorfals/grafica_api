import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsBoolean,
  IsDateString,
  IsInt,
  IsArray,
} from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Nome do cliente que fez o pedido',
    example: 'Maria Oliveira',
  })
  @IsNotEmpty({ message: 'O campo client_name não pode estar vazio' })
  @IsString({ message: 'O campo client_name deve ser uma string' })
  @MinLength(3, {
    message: 'O nome do cliente deve ter no mínimo 3 caracteres',
  })
  client_name: string;

  @ApiProperty({
    description: 'Data de estimativa de entrega (formato ISO)',
    example: '2025-07-20T15:00:00.000Z',
  })
  @IsNotEmpty({ message: 'O campo estimation não pode estar vazio' })
  @IsDateString({}, { message: 'O campo estimation deve ser uma data válida' })
  estimation: string;

  @ApiProperty({
    description: 'Data da realização do pedido (formato ISO)',
    example: '2025-07-13T10:30:00.000Z',
  })
  @IsNotEmpty({ message: 'O campo date não pode estar vazio' })
  @IsDateString({}, { message: 'O campo date deve ser uma data válida' })
  date: string;

  @ApiProperty({
    description: 'Endereço completo do cliente',
    example: 'Rua das Flores, 123 - Centro',
  })
  @IsNotEmpty({ message: 'O campo address não pode estar vazio' })
  @IsString({ message: 'O campo address deve ser uma string' })
  address: string;

  @ApiProperty({
    description: 'Telefone do cliente',
    example: '(77) 99999-1234',
  })
  @IsNotEmpty({ message: 'O campo cellphone não pode estar vazio' })
  @IsString({ message: 'O campo cellphone deve ser uma string' })
  cellphone: string;

  @ApiProperty({
    description: 'Cidade do cliente',
    example: 'Poções',
  })
  @IsNotEmpty({ message: 'O campo city não pode estar vazio' })
  @IsString({ message: 'O campo city deve ser uma string' })
  city: string;

  @ApiProperty({
    description: 'Define se é um pedido ou orçamento',
    example: true,
  })
  @IsNotEmpty({ message: 'O campo is_order não pode estar vazio' })
  @IsBoolean({ message: 'O campo is_order deve ser booleano' })
  is_order: boolean;

  @ApiProperty({
    description: 'Lista ou estrutura dos itens do pedido (formato JSON)',
    example: [{ name: 'Cartão de Visita', quantity: 100 }],
  })
  @IsNotEmpty({ message: 'O campo items não pode estar vazio' })
  @IsArray({ message: 'O campo items deve ser um objeto JSON válido' })
  items: any;

  @ApiProperty({
    description: 'ID do usuário que criou o pedido',
    example: 1,
  })
  @IsNotEmpty({ message: 'O campo cod_user não pode estar vazio' })
  @IsInt({ message: 'O campo cod_user deve ser um número inteiro' })
  cod_user: number;
}
