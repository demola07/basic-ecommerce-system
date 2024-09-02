/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Delete,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { ProductCreateDto } from '../dtos/product-create.dto';
import { ProductUpdateDto } from '../dtos/product-update.dto';
import { ProductService } from '../services/product.service';
import { User } from 'src/domain/users/decorators';
import { User as UserEntity, UserRole } from 'src/application/entities';
import { Roles } from 'src/domain/auth/decorators';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { HttpCode } from '@nestjs/common';
@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/approved')
  async findAllApproved() {
    return await this.productService.findAllApproved();
  }

  @Get('/')
  @Roles(UserRole.USER)
  async findAll(@User() user: UserEntity) {
    return await this.productService.findAllByUser(user);
  }

  @Get(':id')
  @Roles(UserRole.USER)
  async findById(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserEntity,
  ) {
    return await this.productService.findById(id, user);
  }

  @Post('/')
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created.',
  })
  @HttpCode(201)
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiBody({
    type: ProductCreateDto,
    description: 'Json structure for product object',
  })
  @Roles(UserRole.USER)
  async create(
    @Body() createProductDto: ProductCreateDto,
    @User() user: UserEntity,
  ) {
    return await this.productService.create(createProductDto, user);
  }

  @Patch(':id')
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully updated.',
  })
  @HttpCode(201)
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiBody({
    type: ProductUpdateDto,
    description: 'Json structure for product object',
  })
  @Roles(UserRole.USER)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() product: ProductUpdateDto,
    @User() user: UserEntity,
  ) {
    return await this.productService.update(id, product, user);
  }

  @Delete(':id')
  @Roles(UserRole.USER)
  async deleteProductById(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserEntity,
  ) {
    return await this.productService.removeById(id, user);
  }
}
