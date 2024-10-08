import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { DatabaseModule } from './infrastructure/database/database.module';
import { UserModule } from './domain/users/user.module';
import { AuthModule } from './domain/auth/auth.module';
import { AuthMiddleware } from './domain/auth/middleware';
import { ProductModule } from './domain/products/product.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './domain/auth/guards';
import { AdminModule } from './domain/admin/admin.module';
import { FiltersModule } from './infrastructure/filters/filter.module';
import { InterceptorsModule } from './infrastructure/interceptors/interceptors.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    DatabaseModule,
    UserModule,
    AuthModule,
    ProductModule,
    AdminModule,
    FiltersModule,
    InterceptorsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'auth/login', method: RequestMethod.POST },
        { path: 'users/create', method: RequestMethod.POST },
        { path: 'admin/create', method: RequestMethod.POST },
        { path: 'products/approved', method: RequestMethod.GET },
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
