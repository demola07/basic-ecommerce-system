import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { UsePipes } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { UserService } from 'src/domain/users/services';
import { CreateAdminDto } from '../dtos';
import { UserRole } from 'src/application/entities';
import { Roles } from 'src/domain/auth/decorators';
import { Not } from 'typeorm';
import { ProductService } from 'src/domain/products/services';
import { ProductApproveDto, ProductUpdateDto } from 'src/domain/products/dtos';
import { BanUserDto } from 'src/domain/users/dtos';
// import { HttpCode } from '@nestjs/common';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly userService: UserService,
    private readonly productService: ProductService,
  ) {}

  @Post('create')
  @UsePipes(ValidationPipe)
  async createUser(@Body() userData: CreateAdminDto) {
    const payload = {
      ...userData,
      role: UserRole.ADMIN,
    };
    return await this.userService.createOne(payload);
  }

  @Roles(UserRole.ADMIN)
  @Get('users')
  async getAllUsers() {
    return await this.userService.findAll({ role: Not(UserRole.ADMIN) });
  }

  @Roles(UserRole.ADMIN)
  @Get('users/:id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findOne({ id });
  }

  @Roles(UserRole.ADMIN)
  @Get('products')
  async getAllProducts() {
    return await this.productService.findAll();
  }

  @Roles(UserRole.ADMIN)
  @Patch('product/:id/user/:userId/approve')
  async approveProduct(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Body() data: ProductApproveDto,
  ) {
    return await this.productService.approveProduct(id, userId, data);
  }

  @Roles(UserRole.ADMIN)
  @Patch('user/:id/ban')
  async banUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: BanUserDto,
  ) {
    return await this.userService.banUser(id, data);
  }
}
