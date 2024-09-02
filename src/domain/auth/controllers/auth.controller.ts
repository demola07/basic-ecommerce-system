import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services';
import { UserLoginDto } from '../dtos';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { HttpCode } from '@nestjs/common';

// @UseInterceptors(CookieInterceptor)
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiResponse({
    status: 201,
    description: 'The user has logged in successfully.',
  })
  @HttpCode(200)
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiBody({
    type: UserLoginDto,
    description: 'Json structure for user login object',
  })
  async loginUser(@Body() userData: UserLoginDto) {
    return this.authService.login(userData);
  }
}
