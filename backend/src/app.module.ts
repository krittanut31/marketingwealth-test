import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [ProductModule, UserModule, CartModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
