import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  getOrders(id: string) {
    return this.ordersRepository.getOrders(id);
  }

  addOrder(id, products) {
    return this.ordersRepository.addOrder(id, products);
  }
}
