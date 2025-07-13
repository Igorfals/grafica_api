import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsBoolean,
  IsDateString,
  IsInt,
} from 'class-validator';

export class FilterOrderDto {
  @ApiPropertyOptional({
    example: 'Maria Oliveira',
    description: 'Nome do cliente',
  })
  @IsOptional()
  @IsString()
  client_name?: string;

  @ApiPropertyOptional({
    example: '2025-07-20T15:00:00.000Z',
    description: 'Data de estimativa (formato ISO)',
  })
  @IsOptional()
  @IsDateString(
    {},
    { message: 'estimation deve estar em formato de data válida' },
  )
  estimation?: string;

  @ApiPropertyOptional({
    example: '2025-07-13T10:30:00.000Z',
    description: 'Data do pedido (formato ISO)',
  })
  @IsOptional()
  @IsDateString({}, { message: 'date deve estar em formato de data válida' })
  date?: string;

  @ApiPropertyOptional({
    example: '(77) 99999-1234',
    description: 'Telefone do cliente',
  })
  @IsOptional()
  @IsString()
  cellphone?: string;

  @ApiPropertyOptional({ example: 'Poções', description: 'Cidade do cliente' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Filtrar por pedidos (true) ou orçamentos (false)',
  })
  @IsOptional()
  @IsBoolean()
  is_order?: boolean;

  @ApiPropertyOptional({
    example: 1,
    description: 'ID do usuário que criou o pedido',
  })
  @IsOptional()
  @IsInt({ message: 'cod_user deve ser um número inteiro' })
  cod_user?: number;
}
