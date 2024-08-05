import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetails } from '../entities/orderDetails.entity';
import { Orders } from '../entities/orders.entity';
import { Products } from '../entities/products.entity';
import { Users } from '../entities/users.entity';
import { Repository } from 'typeorm';
import { DateTime } from 'luxon';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>,
    @InjectRepository(OrderDetails)
    private readonly ordersDetailsRepository: Repository<OrderDetails>,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async getOrders(id: string) {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: {
        orderDetails: {
          products: true,
        },
      },
    });

    if (!order) throw new NotFoundException('Order not found');

    order.date = DateTime.fromJSDate(new Date(order.date))
      .setZone('America')
      .toFormat('yyyy-MM-dd HH:mm:ss');

    return order;
  }

  async addOrder(id, products: Products[]) {
    let total: number = 0;

    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) throw new NotFoundException('User not found');

    const order = new Orders();
    order.date = new Date();
    order.user = user;

    const newOrder = await this.ordersRepository.save(order);

    const productsList = await Promise.all(
      products.map(async (item) => {
        const product = await this.productsRepository.findOne({
          where: { id: item.id },
        });

        if (!product) {
          throw new NotFoundException(`Product with ID ${item.id} not found`);
        }

        total += Number(product.price);

        await this.productsRepository.update(
          { id: item.id },
          { stock: product.stock - 1 },
        );

        return product;
      }),
    );

    const orderDetail = new OrderDetails();
    orderDetail.products = productsList;
    orderDetail.price = Number(total.toFixed(2));
    orderDetail.order = newOrder;

    await this.ordersDetailsRepository.save(orderDetail);

    const orderDb = await this.ordersRepository.findOne({
      where: { id: newOrder.id },
      relations: {
        orderDetails: true,
      },
    });

    orderDb.date = DateTime.fromJSDate(new Date(order.date))
      .setZone('America')
      .toFormat('yyyy-MM-dd HH:mm:ss');

    return orderDb;
  }
}
