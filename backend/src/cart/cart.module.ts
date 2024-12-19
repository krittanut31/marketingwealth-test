import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: '1234',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
