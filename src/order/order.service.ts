import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterOrderDto } from './dto/filter-order-dto';
import { OrderStatsDto } from './dto/order-stats.dto';
import { Order, Prisma } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import {
  parseSafeDate,
  formatDateOnly,
  getDateRange,
} from 'src/common/utils/date.utils';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly user: UsersService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const userExists = await this.user.findOne(createOrderDto.cod_user);
    if (!userExists) {
      throw new NotFoundException(
        `cod_user ${createOrderDto.cod_user} não encontrado`,
      );
    }

    const estimation = parseSafeDate(createOrderDto.estimation);
    const date = parseSafeDate(createOrderDto.date);
    const { cod_user, ...orderData } = createOrderDto;

    return this.prisma.order.create({
      data: {
        ...orderData,
        estimation,
        date,
        user: {
          connect: { id: cod_user },
        },
      },
    });
  }

  async findAll(filter?: FilterOrderDto): Promise<{
    data: any[];
    total: number;
  }> {
    const where: Prisma.OrderWhereInput = {};

    if (filter?.id) {
      where.id = filter.id;
    }

    if (filter?.client_name) {
      where.client_name = {
        contains: filter.client_name,
        mode: 'insensitive',
      };
    }

    if (filter?.estimation) {
      const estimationDate = parseSafeDate(filter.estimation);
      const nextDay = new Date(estimationDate);
      nextDay.setDate(nextDay.getDate() + 1);

      where.estimation = {
        gte: estimationDate,
        lt: nextDay,
      };
    }

    if (filter?.dateStart && filter?.dateEnd) {
      const { gte, lte } = getDateRange(filter.dateStart, filter.dateEnd);
      where.date = { gte, lte };
    }

    if (filter?.is_order !== undefined) {
      where.is_order = filter.is_order;
    }

    const [rawData, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        skip: filter?.offset,
        take: filter?.limit,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.order.count({ where }),
    ]);

    const data = rawData.map((order) => ({
      ...order,
      estimation: formatDateOnly(order.estimation),
      date: formatDateOnly(order.date),
    }));

    return { data, total };
  }

  findOne(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
    });
  }

  async update(updateOrderDto: UpdateOrderDto) {
    const userExists = await this.user.findOne(updateOrderDto.cod_user);
    if (!userExists) {
      throw new NotFoundException(
        `cod_user ${updateOrderDto.cod_user} não encontrado`,
      );
    }

    const { id, estimation, date, ...orderData } = updateOrderDto;

    return this.prisma.order.update({
      where: { id },
      data: {
        ...orderData,
        ...(estimation && {
          estimation: parseSafeDate(estimation.split('T')[0]),
        }),
        ...(date && { date: parseSafeDate(date.split('T')[0]) }),
      },
    });
  }

  async remove(id: number) {
    await this.prisma.order.delete({
      where: { id },
    });
    return { message: 'Order successfully deleted.' };
  }

  async getStats(): Promise<OrderStatsDto> {
    // Usar agregação do banco para calcular estatísticas diretamente - MUITO MAIS EFICIENTE!
    const [ordersStats, ordersCount, budgetsCount] = await Promise.all([
      // Estatísticas apenas dos pedidos (is_order = true)
      this.prisma.order.aggregate({
        where: {
          is_order: true,
        },
        _sum: {
          total_price: true,
          total_products: true,
        } as any
      }),
      // Contagem de pedidos (is_order = true)
      this.prisma.order.count({
        where: {
          is_order: true,
        },
      }),
      // Contagem de orçamentos (is_order = false)
      this.prisma.order.count({
        where: {
          is_order: false,
        },
      }),
    ]);

    return {
      totalOrders: ordersCount,
      totalBudgets: budgetsCount,
      totalRevenue: Number(((ordersStats._sum as any)?.total_price || 0).toFixed(2)),
      totalProducts: Number((ordersStats._sum as any)?.total_products || 0),
      lastUpdated: new Date(),
    };
  }
}
