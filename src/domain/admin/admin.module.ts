import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Product, User } from 'src/application/entities';
// import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/services';
import { UserRepository } from '../users/repository';
import { AdminService } from './services';
import { AdminController } from './controllers';
import { UserService } from '../users/services';
import { ProductService } from '../products/services';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRepository, Product])],
  providers: [
    AdminService,
    AuthService,
    Logger,
    JwtService,
    UserService,
    ProductService,
  ],
  controllers: [AdminController],
  exports: [],
})
export class AdminModule {}
