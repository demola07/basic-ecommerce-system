/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/application/entities';
// import { CreateUserDto } from 'src/domain/users/dtos';
import { UserService } from 'src/domain/users/services';
import {
  CREDENTIALS_INVALID,
  SOMETHING_WENT_WRONG,
  USER_NOT_FOUND,
} from 'src/shared/errors';
import { UserLoginDto } from '../dtos';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} from 'src/shared/constants';
import { IUser } from 'src/interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // async getAuthUser(email: string, password: string): Promise<User> {
  //   try {
  //     const user = await this.userService.findOneByEmail(email);
  //     this.verifyPassword(password, user.password);
  //     user.password = null;
  //     return user;
  //   } catch (error) {
  //     throw new InternalServerErrorException(SOMETHING_WENT_WRONG);
  //   }
  // }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatch = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatch) {
      throw new BadRequestException(CREDENTIALS_INVALID);
    }
  }

  async login(userData: UserLoginDto) {
    const { email, password } = userData;
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
    await this.verifyPassword(password, user.password);
    return this.createToken(user);
  }

  public async createToken(user: IUser) {
    const data: JwtPayload = {
      email: user.email,
      name: user.name,
      sub: user.id.toString(),
    };
    try {
      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(data, {
          secret: this.configService.get<string>(ACCESS_TOKEN_SECRET),
          expiresIn: '1h',
        }),
        this.jwtService.signAsync(
          { userId: data.sub },
          {
            secret: this.configService.get<string>(REFRESH_TOKEN_SECRET),
            expiresIn: '1d',
          },
        ),
      ]);
      return {
        user: user.toSafeObject(),
        access_token: accessToken,
        refresh_token: refreshToken,
      };
    } catch (error) {
      throw new InternalServerErrorException(SOMETHING_WENT_WRONG);
    }
  }
}
