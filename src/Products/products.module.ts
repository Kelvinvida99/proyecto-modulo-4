import { Module } from '@nestjs/common';
import { ProductsServices } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from '../entities/products.entity';
import { Categories } from '../entities/categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products, Categories])],
  providers: [ProductsServices],
  controllers: [ProductsController],
  exports: [ProductsServices],
})
export class ProductsModule {}
