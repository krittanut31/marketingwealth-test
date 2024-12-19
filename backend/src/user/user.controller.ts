import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: number) {
    return this.userService.getUserById(+id);
  }

  @Post('/register')
  async createUser(
    @Body() data: { name: string; email: string; password: string },
  ) {
    return this.userService.createUser(data);
  }

  @Post('/signin')
  async signin(
    @Body() data: { email: string; password: string },
    @Res() res: Response,
  ) {
    const token = await this.userService.signin(data);
    console.log(token);

    res.cookie('token', token, {
      httpOnly: true, // ป้องกันการเข้าถึงผ่าน JavaScript
      secure: true, // ใช้ secure เมื่ออยู่ใน HTTPS
      sameSite: 'strict', // ป้องกันการส่ง Cookies ข้ามเว็บไซต์
      maxAge: 60 * 60 * 100000, // อายุ Cookies (1 ชั่วโมง)
    });

    return res.json({ message: 'Login succes.' });
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() data: { name?: string; email?: string },
  ) {
    return this.userService.updateUser(+id, data);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(+id);
  }
}
