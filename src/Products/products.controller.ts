import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsServices } from './products.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/Auth/guards/auth.guard';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsServices) {}

  @Get()
  @ApiOperation({ summary: 'Obtiene todos los productos' })
  @ApiResponse({
    status: 200,
    description: 'Productos obtenidos exitosamente.',
  })
  @ApiResponse({ status: 404, description: 'Productos no encontrados.' })
  getProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    return this.productsService.getProducts(page, limit);
  }

  @Get('seeder')
  @ApiOperation({ summary: 'Crea un producto de prueba' })
  createProduct() {
    return this.productsService.createProduct();
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Actualiza un producto por ID' })
  @ApiResponse({
    status: 200,
    description: 'Producto actualizado exitosamente.',
  })
  @ApiResponse({ status: 401, description: 'Acceso no autorizado.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  updateProduct(@Param('id') id: string, @Body() product) {
    return this.productsService.updateProduct(id, product);
  }

  /*  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  } */

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene un producto por ID' })
  @ApiResponse({ status: 200, description: 'Producto obtenido exitosamente.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  getProductById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProductById(id);
  }
}
