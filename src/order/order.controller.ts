import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { FilterOrderDto } from './dto/filter-order-dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'))
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  async findAll(@Query() filters: FilterOrderDto) {
    const { data, total } = await this.orderService.findAll(filters);

    return {
      data,
      pagination: {
        limit: filters.limit ?? 10,
        offset: filters.offset ?? 0,
        total,
        totalPages: filters.limit ? Math.ceil(total / filters.limit) : 1,
      },
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Put(':id')
  update(@Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
