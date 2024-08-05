import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as data from '../utils/data.json';
import { Products } from '../entities/products.entity';
import { Categories } from '../entities/categories.entity';

@Injectable()
export class ProductsServices {
  constructor(
    @InjectRepository(Products)
    private _ProductsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private _categoriesRepository: Repository<Categories>,
  ) {}

  async getProducts(page: number, Limit: number): Promise<Products[]> {
    let products = await this._ProductsRepository.find({
      relations: {
        categories: true,
      },
    });

    const start = (page - 1) * Limit;
    const end = start + +Limit;

    products = products.slice(start, end);
    return products;
  }

  getProductById(id: string) {
    const product = this._ProductsRepository.findOneBy({ id });

    if (!product) {
      return 'product not found';
    }
    return product;
  }

  async createProduct() {
    const categories = await this._categoriesRepository.find();
    console.log(categories);
    if (categories.length === 0) {
      return 'Ejecuta el seeder de categorias primero';
    }

    if (!data || data.length === 0) {
      return 'No hay datos para insertar';
    }

    try {
      const productPromises = data.map(async (element) => {
        const category = categories.find(
          (category) => category.name === element.category,
        );
        if (!category) {
          console.log(
            `Categoría no encontrada para el producto: ${element.name}`,
          );
          return;
        }

        console.log(data);

        const product = new Products();
        product.name = element.name;
        product.description = element.description;
        product.price = element.price;
        product.imgUrl = element.imgUrl;
        product.stock = element.stock;
        product.categories = category;

        console.log(`Insertando producto: ${product.name}`);

        return this._ProductsRepository
          .createQueryBuilder()
          .insert()
          .into(Products)
          .values(product)
          .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
          .execute();
      });

      await Promise.all(productPromises);

      return 'Products added successfully';
    } catch (error) {
      console.error('Error al insertar productos:', error);
      return 'Error al insertar productos';
    }
  }

  async updateProduct(id: string, product: Products) {
    await this._ProductsRepository.update(id, product);

    const update = await this._categoriesRepository.findOneBy({ id });

    return update;
  }

  // remove(id: number) {
  //     return this._ProductRepository.remove(id);
  // }
}
