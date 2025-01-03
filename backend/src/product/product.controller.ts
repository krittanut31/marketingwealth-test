import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productServervice: ProductService) {}

  @Get()
  getAllProduct() {
    return this.productServervice.findAll();
  }

  @Get(':id')
  getProductById(@Param('id') id: number) {
    return this.productServervice.fineProductById(+id);
  }

  // @Post('/createAll')
  // createProduct() {
  //   this.data.map((data) => {
  //     return this.productServervice.createProduct(data);
  //   });
  // }
}
