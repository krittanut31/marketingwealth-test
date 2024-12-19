import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CartService {
  private prisma = new PrismaClient();

  async addToCart(userId: number, productId: number) {
    const hasAlreadyCart = await this.prisma.cart.findFirst({
      where: { userId: userId, productId: productId },
    });

    if (!hasAlreadyCart) {
      return this.prisma.cart.create({
        data: { userId, productId, quantity: 1 },
      });
    } else
      return this.prisma.cart.update({
        where: { id: hasAlreadyCart.id },
        data: { quantity: hasAlreadyCart.quantity + 1 },
      });
  }

  async deleteCart(cartId: number) {
    return this.prisma.cart.delete({
      where: { id: cartId },
    });
  }

  async getUserCart(userId: number) {
    return this.prisma.cart.findMany({
      where: { userId },
      include: {
        product: true, // ดึงข้อมูลสินค้าใน Cart
      },
    });
  }
}
