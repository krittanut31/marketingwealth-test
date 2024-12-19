import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(private readonly jwtService: JwtService) {}
  private prisma = new PrismaClient();

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async getUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async createUser(data: { name: string; email: string; password: string }) {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);

      return this.prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: hashedPassword,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('Email already exists');
      } else {
        throw new InternalServerErrorException(
          'An error occurred while creating the user',
        );
      }
    }
  }

  async signin(data: { email: string; password: string }) {
    console.log(data);

    const result = await this.prisma.user.findFirst({
      where: { email: data.email },
    });

    console.log(result);

    const checkHashedPassword = await bcrypt.compare(
      data.password,
      result.password,
    );

    console.log(checkHashedPassword);
    const payload = { email: result.email, sub: result.id };

    const token = this.jwtService.sign(payload, {
      expiresIn: '1h', // กำหนดอายุของ Token
    });

    return token;
  }

  async updateUser(id: number, data: { name?: string; email?: string }) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }
  async deleteUser(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
