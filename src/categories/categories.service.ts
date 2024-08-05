import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as data from '../utils/data.json';
import { Categories } from '../entities/categories.entity';
// import { CreateCategoryDto } from './dto/create-category.dto';
// import { UpdateCategoryDto } from './dto/update-category.dto';
@Injectable()
export class CategoriesServices {
  constructor(
    @InjectRepository(Categories)
    private _categoriesRepository: Repository<Categories>,
  ) {}

  async getCategories() {
    return await this._categoriesRepository.find();
  }

  async addCategories() {
    data?.map(async (element) => {
      await this._categoriesRepository
        .createQueryBuilder()
        .insert()
        .into(Categories)
        .values({ name: element.category })
        .onConflict(`("name") DO NOTHING`)
        .execute();
    });
    return 'Categories added';
  }
}
