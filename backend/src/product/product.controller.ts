import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productServervice: ProductService) {}
  @Get()
  getAllProduct() {
    return this.productServervice.findAll();
  }
  @Post()
  addProduct(@Body() product) {
    return this.productServervice.create(product);
  }
}
