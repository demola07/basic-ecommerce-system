import { Module, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from '../users/user.module';
import { AuthService } from './services';
import { AuthController } from './controllers';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [AuthService, JwtService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
