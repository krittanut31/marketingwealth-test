import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ProductService {
  private prisma = new PrismaClient();

  async findAll() {
    const product = await this.prisma.product.findMany();
    return {
      product: product,
      length: product.length,
    };
  }

  async fineProductById(id: number) {
    return this.prisma.product.findUnique({ where: { id } });
  }
}
