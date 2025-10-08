import { ApiProperty } from '@nestjs/swagger';

export class OrderStatsDto {
  @ApiProperty({
    description: 'Número total de pedidos cadastrados (is_order = true)',
    example: 150,
  })
  totalOrders: number;

  @ApiProperty({
    description: 'Número total de orçamentos cadastrados (is_order = false)',
    example: 75,
  })
  totalBudgets: number;

  @ApiProperty({
    description: 'Valor total de faturamento (soma de todos os itens dos pedidos)',
    example: 15750.50,
  })
  totalRevenue: number;

  @ApiProperty({
    description: 'Número total de produtos vendidos (soma das quantidades de todos os itens)',
    example: 1250,
  })
  totalProducts: number;

  @ApiProperty({
    description: 'Data da última atualização das estatísticas',
    example: '2025-01-15T10:30:00.000Z',
  })
  lastUpdated: Date;
}
