import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Api Ecommerce')
  .setDescription('Ecommerce creado con nestjs (PM4)')
  .addBearerAuth()
  .build();
