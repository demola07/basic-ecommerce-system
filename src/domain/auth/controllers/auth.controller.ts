import {
  Controller,
  Post,
  Req,
  Body,
  BadRequestException,
  ForbiddenException,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from '../services';
import { UserLoginDto } from '../dtos';
// import { CookieInterceptor } from './interceptor/cookie.interceptor';

// @UseInterceptors(CookieInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async loginUser(@Body() userData: UserLoginDto) {
    return this.authService.login(userData);
  }

  // @Post('refresh-token')
  // async getTokens(@Req() req): Promise<LoginResponse> {
  //   const token = req.cookies['refreshToken'];

  //   try {
  //     const { accessToken, refreshToken, user } =
  //       await this.authService.refreshTokens(token);
  //     if (accessToken && user) {
  //       return { accessToken, refreshToken };
  //     }
  //   } catch (error) {
  //     throw new ForbiddenException(error.message);
  //   }
  // }
}
