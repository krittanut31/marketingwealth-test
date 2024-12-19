import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Req,
  Headers,
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
    const token = authorization.split(' ')[1]; // ดึง JWT Token จาก Header
    const decoded = this.jwtService.verify(token); // ถอดรหัส JWT
    const userId = decoded.sub; // ดึง userId จาก payload

    const { productId } = body;
    return this.cartService.addToCart(userId, productId);
  }

  // GET: ดึง Cart ของผู้ใช้
  @Get()
  async getUserCart(@Req() req) {
    const userId = req.user.id; // ดึง userId จาก JWT
    return this.cartService.getUserCart(userId);
  }

  // PATCH: อัปเดตจำนวนสินค้าใน Cart
  // @Patch(':cartId')
  // async updateCart(@Param('cartId') cartId: number, @Body() body) {
  //   const { quantity } = body;
  //   return this.cartService.updateCart(Number(cartId), quantity);
  // }

  // DELETE: ลบสินค้าออกจาก Cart
  @Delete(':cartId')
  async deleteCart(@Param('cartId') cartId: number) {
    return this.cartService.deleteCart(Number(cartId));
  }
}
