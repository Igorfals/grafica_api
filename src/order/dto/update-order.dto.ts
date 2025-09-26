import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  MinLength,
  IsBoolean,
  IsDateString,
  IsInt,
  IsArray,
} from 'class-validator';

export class UpdateOrderDto {
  @ApiPropertyOptional({
    description: 'ID do pedido',
    example: 1,
  })
  @IsOptional()
  @IsInt({ message: 'O campo id deve ser um número inteiro' })
  id?: number;

  @ApiPropertyOptional({
    description: 'Nome do cliente',
    example: 'Maria Oliveira',
  })
  @IsOptional()
  @IsString({ message: 'O campo client_name deve ser uma string' })
  @MinLength(3, {
    message: 'O nome do cliente deve ter no mínimo 3 caracteres',
  })
  client_name: string;

  @ApiPropertyOptional({
    description: 'Data de estimativa (formato ISO)',
    example: '2025-07-20T15:00:00.000Z',
  })
  @IsOptional()
  @IsDateString(
    {},
    { message: 'estimation deve estar em formato de data válida' },
  )
  estimation: string;

  @ApiPropertyOptional({
    description: 'Data do pedido (formato ISO)',
    example: '2025-07-13T10:30:00.000Z',
  })
  @IsOptional()
  @IsDateString({}, { message: 'date deve estar em formato de data válida' })
  date?: string;

  @ApiPropertyOptional({
    description: 'Endereço do cliente',
    example: 'Rua das Flores, 123 - Centro',
  })
  @IsOptional()
  @IsString({ message: 'O campo address deve ser uma string' })
  address?: string;

  @ApiPropertyOptional({
    description: 'Telefone do cliente',
    example: '(77) 99999-1234',
  })
  @IsOptional()
  @IsString({ message: 'O campo cellphone deve ser uma string' })
  cellphone?: string;

  @ApiPropertyOptional({
    description: 'Cidade do cliente',
    example: 'Poções',
  })
  @IsOptional()
  @IsString({ message: 'O campo city deve ser uma string' })
  city: string;

  @ApiPropertyOptional({
    description: 'Define se é um pedido ou orçamento',
    example: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'O campo is_order deve ser booleano' })
  is_order: boolean;

  @ApiPropertyOptional({
    description: 'Lista ou estrutura dos itens do pedido (formato JSON)',
    example: [{ name: 'Cartão de Visita', quantity: 100 }],
  })
  @IsOptional()
  @IsArray({ message: 'O campo items deve ser um objeto JSON válido' })
  items: any;

  @ApiPropertyOptional({
    description: 'ID do usuário responsável pelo pedido',
    example: 1,
  })
  @IsOptional()
  @IsInt({ message: 'O campo cod_user deve ser um número inteiro' })
  cod_user: number;
}
