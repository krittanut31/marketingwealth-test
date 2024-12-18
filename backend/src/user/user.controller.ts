import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';

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
  async signin(@Body() data: { email: string; password: string }) {
    return this.userService.signin(data);
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
