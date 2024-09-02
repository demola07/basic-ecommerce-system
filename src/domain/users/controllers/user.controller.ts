import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { UsePipes } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
// import { HttpCode } from '@nestjs/common';
import { CreateUserDto } from '../dtos';
import { UserService } from '../services';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @UsePipes(ValidationPipe)
  async createUser(@Body() userData: CreateUserDto) {
    return await this.userService.createOne(userData);
  }
}
