import { verify } from 'jsonwebtoken';
import { NestMiddleware, Injectable, ForbiddenException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { CREDENTIALS_INVALID } from 'src/shared/errors';
import { AccessTokenPayload } from '../types';
import { UserService } from 'src/domain/users/services';
import { User } from 'src/application/entities';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: Request | any, res: Response, next: NextFunction) {
    const bearerHeader = req.headers.authorization;
    const accessToken = bearerHeader && bearerHeader.split(' ')[1];
    let user: User;

    if (!bearerHeader || !accessToken) {
      return next();
    }

    try {
      const payload = verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
      ) as AccessTokenPayload;
      user = await this.userService.findOneById(+payload.sub);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new ForbiddenException(CREDENTIALS_INVALID);
    }

    if (user) {
      req.user = user;
    }
    next();
  }
}
