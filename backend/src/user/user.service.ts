import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { PatchUserDto } from './dto/patch-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: CreateUserDto) {
    return this.prisma.user.create({
      data,
    });
  }  

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async getUserByEmail(email: string, throwIfNotFound = true) {
    const user = await this.prisma.user.findUnique({ where: { email } });
  
    if (!user && throwIfNotFound) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  
    return user;
  }

  async updateUserByEmail(email: string, data: UpdateUserDto) {
    return this.prisma.user.update({
      where: { email },
      data,
    });
  }

  async updateUserById(id: string, data: PatchUserDto) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }
  
}

