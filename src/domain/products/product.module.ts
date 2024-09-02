import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/application/entities';
import { ProductController } from './controllers';
import { ProductRepository } from './repository';
import { ProductService } from './services';
import { UserModule } from '../users/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductRepository]), UserModule],
  providers: [ProductService, Logger],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
