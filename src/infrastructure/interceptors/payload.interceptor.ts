import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseCode } from 'src/shared/constants';

export interface ReturnObject<T> {
  data: T;
}

@Injectable()
export class PayloadInterceptor<T>
  implements NestInterceptor<T, ReturnObject<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ReturnObject<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();

    return next.handle().pipe(
      map((data) => ({
        status: this.getResponseStatus(response.statusCode),
        timestamp: new Date().toISOString(),
        data,
      })),
    );
  }

  getResponseStatus(code: number): ResponseCode {
    return code >= 200 && code < 300
      ? ResponseCode.success
      : ResponseCode.error;
  }
}
