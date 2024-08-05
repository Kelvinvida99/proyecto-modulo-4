import { Controller, Get } from '@nestjs/common';
import { CategoriesServices } from './categories.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesServices: CategoriesServices) {}

  @Get()
  @ApiOperation({ summary: 'Obtiene todas las categorías' })
  @ApiResponse({
    status: 200,
    description: 'Categorías obtenidas exitosamente.',
  })
  getCategories() {
    return this.categoriesServices.getCategories();
  }

  @Get('seeder')
  @ApiOperation({ summary: 'Crea categorías de prueba' })
  @ApiResponse({
    status: 200,
    description: 'Categorías de prueba creadas exitosamente.',
  })
  addCategories() {
    return this.categoriesServices.addCategories();
  }
}
