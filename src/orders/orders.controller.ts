import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrdersDto } from './orders.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserGuard } from '../Auth/guards/user.guard';
import { AuthGuard } from '../Auth/guards/auth.guard';

ApiTags('orders');
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene una orden por ID' })
  @ApiResponse({ status: 200, description: 'Orden obtenida exitosamente.' })
  @ApiResponse({ status: 401, description: 'Acceso no autorizado.' })
  @ApiResponse({ status: 404, description: 'Orden no encontrada.' })
  getOrders(@Param('id') id: string) {
    return this.ordersService.getOrders(id);
  }

  @Post()
  @UseGuards(AuthGuard, UserGuard)
  @ApiOperation({ summary: 'Crea una nueva orden' })
  @ApiResponse({ status: 201, description: 'Orden creada exitosamente.' })
  @ApiResponse({
    status: 400,
    description: 'El id no tiene un formato válido.',
  })
  @ApiResponse({ status: 401, description: 'Acceso no autorizado.' })
  @ApiResponse({
    status: 404,
    description: 'No se encontró el user o el product.',
  })
  addOrder(@Body() order: CreateOrdersDto) {
    const { userId, products } = order;
    return this.ordersService.addOrder(userId, products);
  }
}
