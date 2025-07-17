import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsDateString, IsInt } from 'class-validator';

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
    example: '2025-07-13T10:30:00.000Z',
    description: 'Data do pedido (formato ISO)',
  })
  @IsOptional()
  @IsDateString({}, { message: 'date deve estar em formato de data válida' })
  date?: string;

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
