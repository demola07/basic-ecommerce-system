import { verify } from 'jsonwebtoken';
import {
  NestMiddleware,
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import {
  CREDENTIALS_INVALID,
  MISSING_AUTH_HEADER,
  USER_BANNED,
} from 'src/shared/errors';
import { AccessTokenPayload } from '../types';
import { UserService } from 'src/domain/users/services';
import { User } from 'src/application/entities';
import { AuthService } from '../services';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  async use(req: Request | any, res: Response, next: NextFunction) {
    const bearerHeader = req.headers.authorization;
    const accessToken = bearerHeader && bearerHeader.split(' ')[1];
    let user: User;

    if (!bearerHeader || !accessToken) {
      throw new UnauthorizedException(MISSING_AUTH_HEADER);
    }

    try {
      const payload = verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
      ) as AccessTokenPayload;
      user = await this.userService.findOne({ id: +payload.sub });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new ForbiddenException(CREDENTIALS_INVALID);
    }
    if ((await this.authService.isTokenValid(accessToken)) !== true) {
      throw new UnauthorizedException(USER_BANNED);
    }

    if (user) {
      req.user = user.toSafeObject();
    }
    next();
  }
}
