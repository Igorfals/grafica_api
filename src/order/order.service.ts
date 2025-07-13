import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterOrderDto } from './dto/filter-order-dto';
import { Order, Prisma } from '@prisma/client';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly user: UsersService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const userExists = await this.user.findOne(createOrderDto.cod_user);
    const estimation = new Date(createOrderDto.estimation);
    const date = new Date(createOrderDto.date);
    if (!userExists) {
      throw new NotFoundException(
        `cod_user ${createOrderDto.cod_user} not found`,
      );
    }
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

  findAll(filter?: FilterOrderDto): Promise<Order[]> {
    const where: Prisma.OrderWhereInput = {};
    if (filter?.client_name) {
      where.client_name = {
        contains: filter.client_name,
        mode: 'insensitive',
      };
    }
    if (filter?.estimation) {
      where.estimation = new Date(filter.estimation);
    }
    if (filter?.date) {
      where.date = new Date(filter.date);
    }
    if (filter?.cellphone) {
      where.city = {
        contains: filter.city,
        mode: 'insensitive',
      };
    }
    if (filter?.city) {
      where.city = {
        contains: filter.city,
        mode: 'insensitive',
      };
    }
    if (filter?.is_order !== undefined) {
      where.is_order = filter.is_order;
    }
    if (filter?.cod_user) {
      where.cod_user = filter.cod_user;
    }
    return this.prisma.order.findMany({ where });
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
        `cod_user ${updateOrderDto.cod_user} not found`,
      );
    }

    const { id_order, estimation, date, ...orderData } = updateOrderDto;

    return this.prisma.order.update({
      where: { id: id_order },
      data: {
        ...orderData,
        ...(estimation && { estimation: new Date(estimation) }),
        ...(date && { date: new Date(date) }),
      },
    });
  }

  async remove(id: number) {
    await this.prisma.order.delete({
      where: { id },
    });
    return { message: 'Order deleted successfully' };
  }
}
