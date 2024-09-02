import {
  Controller,
  Post,
  Req,
  Body,
  BadRequestException,
  ForbiddenException,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services';
import { UserLoginDto } from '../dtos';
// import { AuthGuard } from '../guards';
// import { CookieInterceptor } from './interceptor/cookie.interceptor';

// @UseInterceptors(CookieInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(AuthGuard)
  @Post('login')
  async loginUser(@Body() userData: UserLoginDto) {
    return this.authService.login(userData);
  }
}
