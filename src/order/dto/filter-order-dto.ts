import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsDateString, IsInt, IsBoolean } from 'class-validator';

export class FilterOrderDto {
  @ApiPropertyOptional({
    example: 1,
    description: 'ID do pedido',
  })
  @Transform(({ value }) => (!isNaN(+value) ? +value : undefined))
  @IsOptional()
  @IsInt({ message: 'id deve ser um número inteiro' })
  id?: number;

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
    example: '2025-07-13T00:00:00.000Z',
    description: 'Data inicial do pedido (formato ISO)',
  })
  @IsOptional()
  @IsDateString(
    {},
    { message: 'dateStart deve estar em formato de data válida' },
  )
  dateStart?: string;

  @ApiPropertyOptional({
    example: '2025-07-17T23:59:59.000Z',
    description: 'Data final do pedido (formato ISO)',
  })
  @IsOptional()
  @IsDateString({}, { message: 'dateEnd deve estar em formato de data válida' })
  dateEnd?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Filtrar por tipo: true para pedidos, false para orçamentos',
  })
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return undefined;
  })
  @IsOptional()
  @IsBoolean({ message: 'is_order deve ser um valor booleano' })
  is_order?: boolean;

  @ApiPropertyOptional({
    example: 1,
    description: 'Código do usuário associado ao pedido',
  })
  @Transform(({ value }) => (!isNaN(+value) ? +value : undefined))
  @IsOptional()
  @IsInt({ message: 'limit deve ser um número inteiro' })
  limit?: number;

  @ApiPropertyOptional({
    example: 0,
    description: 'Deslocamento para paginação',
  })
  @Transform(({ value }) => (!isNaN(+value) ? +value : undefined))
  @IsOptional()
  @IsInt({ message: 'offset deve ser um número inteiro' })
  offset?: number;
}
