import { Logger, Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Product, User } from 'src/application/entities';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/services';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repository';
import { UserService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRepository, Product]),
    forwardRef(() => AuthModule),
  ],
  providers: [UserService, AuthService, Logger, JwtService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
