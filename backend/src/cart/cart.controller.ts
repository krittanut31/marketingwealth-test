import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Req,
  Headers,
  Patch,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtService } from '@nestjs/jwt';

@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly jwtService: JwtService,
  ) {}

  // POST: เพิ่มสินค้าในตะกร้า
  @Post()
  async createCart(
    @Body() body,
    @Headers('authorization') authorization: string,
  ) {
    const token = authorization.split(' ')[1];
    const decoded = this.jwtService.verify(token);
    const userId = decoded.sub;

    const { productId } = body;
    return this.cartService.addToCart(userId, productId);
  }

  @Get()
  async getUserCart(
    @Req() req,
    @Headers('authorization') authorization: string,
  ) {
    const token = authorization.split(' ')[1];
    const decoded = this.jwtService.verify(token);
    const userId = decoded.sub;
    return this.cartService.getUserCart(userId);
  }

  @Patch(':cartId')
  async updateCart(
    @Param('cartId') cartId: number,
    @Body() body,
    @Headers('authorization') authorization: string,
  ) {
    const { action } = body;
    const token = authorization.split(' ')[1];
    const decoded = this.jwtService.verify(token);
    const userId = decoded.sub;
    return this.cartService.updateCart(userId, Number(cartId), action);
  }

  @Delete(':cartId')
  async deleteCart(
    @Param('cartId') cartId: number,
    @Headers('authorization') authorization: string,
  ) {
    const token = authorization.split(' ')[1];
    const decoded = this.jwtService.verify(token);
    const userId = decoded.sub;
    return this.cartService.deleteCart(userId, Number(cartId));
  }
}
