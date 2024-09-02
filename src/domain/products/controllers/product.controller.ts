/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Body,
  Post,
  Delete,
  Put,
  BadRequestException,
  SetMetadata,
  Req,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { ProductCreateDto } from '../dtos/product-create.dto';
import { ProductUpdateDto } from '../dtos/product-update.dto';
import { ProductService } from '../services/product.service';
import { User } from 'src/domain/users/decorators';
import { User as UserEntity } from 'src/application/entities';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(@User() user: UserEntity) {
    return await this.productService.findAll(user);
  }

  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserEntity,
  ) {
    return await this.productService.findById(id, user);
  }

  @Post('')
  // @Roles('admin', 'manager')
  async create(
    @Body() createProductDto: ProductCreateDto,
    @User() user: UserEntity,
  ) {
    return await this.productService.create(createProductDto, user);
  }

  @Patch(':id')
  // @Roles('admin', 'manager')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() product: ProductUpdateDto,
    @User() user: UserEntity,
  ) {
    return await this.productService.update(id, product, user);
  }

  @Delete(':id')
  // @Roles('admin')
  async deleteProductById(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserEntity,
  ) {
    return await this.productService.removeById(id, user);
  }
}
