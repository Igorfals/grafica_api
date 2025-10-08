import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsBoolean,
  IsInt,
  IsArray,
  Matches,
} from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: 'Maria Oliveira' })
  @IsNotEmpty({ message: 'O campo client_name não pode estar vazio' })
  @IsString({ message: 'O campo client_name deve ser uma string' })
  @MinLength(3, {
    message: 'O nome do cliente deve ter no mínimo 3 caracteres',
  })
  client_name: string;

  @ApiProperty({ example: '2025-07-20' })
  @IsNotEmpty({ message: 'O campo estimation não pode estar vazio' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'O campo estimation deve estar no formato YYYY-MM-DD',
  })
  estimation: string;

  @ApiProperty({ example: '2025-07-13' })
  @IsNotEmpty({ message: 'O campo date não pode estar vazio' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'O campo date deve estar no formato YYYY-MM-DD',
  })
  date: string;

  @ApiProperty({ example: 'Rua das Flores, 123 - Centro' })
  @IsNotEmpty({ message: 'O campo address não pode estar vazio' })
  @IsString({ message: 'O campo address deve ser uma string' })
  address: string;

  @ApiProperty({ example: '(77) 99999-1234' })
  @IsNotEmpty({ message: 'O campo cellphone não pode estar vazio' })
  @IsString({ message: 'O campo cellphone deve ser uma string' })
  cellphone: string;

  @ApiProperty({ example: 'Poções' })
  @IsNotEmpty({ message: 'O campo city não pode estar vazio' })
  @IsString({ message: 'O campo city deve ser uma string' })
  city: string;

  @ApiProperty({ example: true })
  @IsNotEmpty({ message: 'O campo is_order não pode estar vazio' })
  @IsBoolean({ message: 'O campo is_order deve ser booleano' })
  is_order: boolean;

  @ApiProperty({ example: [{ name: 'Cartão de Visita', quantity: 100 }] })
  @IsNotEmpty({ message: 'O campo items não pode estar vazio' })
  @IsArray({ message: 'O campo items deve ser um array' })
  items: any;

  @ApiProperty({ example: 150.50, description: 'Preço total do pedido' })
  @IsNotEmpty({ message: 'O campo total_price não pode estar vazio' })
  total_price: number;

  @ApiProperty({ example: 25, description: 'Total de produtos no pedido' })
  @IsNotEmpty({ message: 'O campo total_products não pode estar vazio' })
  total_products: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: 'O campo cod_user não pode estar vazio' })
  @IsInt({ message: 'O campo cod_user deve ser um número inteiro' })
  cod_user: number;
}
