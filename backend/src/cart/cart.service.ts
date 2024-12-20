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

  async deleteCart(userId: number, cartId: number) {
    const cartItem = await this.prisma.cart.findFirst({
      where: { id: cartId, userId: userId },
    });

    if (!cartItem) {
      throw new Error('Not found Item');
    }

    return this.prisma.cart.delete({
      where: { id: cartId },
    });
  }

  async getUserCart(userId: number) {
    const cartData = await this.prisma.cart.findMany({
      where: { userId },
      include: {
        product: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const totalQuantity = cartData.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );

    const totalPrice = +cartData
      .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      .toFixed(2);

    return {
      cartData: cartData,
      length: (await cartData).length,
      totalQuantity: totalQuantity,
      totalPrice: totalPrice,
    };
  }

  async updateCart(
    userId: number,
    cartId: number,
    action: 'increment' | 'decrement',
  ) {
    const cartItem = await this.prisma.cart.findFirst({
      where: { id: cartId, userId: userId },
    });

    if (!cartItem) {
      throw new Error('Cart item not found or does not belong to this user');
    }

    const newQuantity =
      action === 'increment' ? cartItem.quantity + 1 : cartItem.quantity - 1;

    if (newQuantity < 1) {
      return this.prisma.cart.delete({
        where: { id: cartId },
      });
    }

    return this.prisma.cart.update({
      where: { id: cartId },
      data: { quantity: newQuantity },
    });
  }
}
