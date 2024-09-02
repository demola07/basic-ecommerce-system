import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PayloadInterceptor } from './payload.interceptor';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: PayloadInterceptor,
    },
  ],
})
export class InterceptorsModule {}
