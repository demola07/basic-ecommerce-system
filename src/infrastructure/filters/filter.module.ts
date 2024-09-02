import { APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';

const providers: Array<any> = [
  { provide: APP_FILTER, useClass: HttpExceptionFilter },
];

@Module({
  providers,
})
export class FiltersModule {}
