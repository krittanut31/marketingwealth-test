import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ItemType } from 'src/type';

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

  async createProduct(data: ItemType) {
    return this.prisma.product.create({
      data: {
        name: data.name,
        price: data.price,
        imageUrl: data.imageUrl,
        quantity: data.quantity,
        description: data.description,
        category: data.category,
      },
    });
  }
}
