import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetails } from '../entities/orderDetails.entity';
import { Products } from '../entities/products.entity';
import { Users } from '../entities/users.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { Orders } from '../entities/orders.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, OrderDetails, Products, Users])],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
