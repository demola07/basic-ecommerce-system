import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/application/entities';
import { ProductController } from './controllers';
import { ProductRepository } from './repository';
import { ProductService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductRepository])],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
