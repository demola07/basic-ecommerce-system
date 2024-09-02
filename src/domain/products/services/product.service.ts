import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product, User } from 'src/application/entities';
import { ProductRepository } from '../repository';
import { ProductCreateDto } from '../dtos/product-create.dto';
import { IProduct } from 'src/interfaces/product';
import { IUser } from 'src/interfaces';
import { buildQuery } from '../utilities';
import { PRODUCT_NOT_FOUND } from 'src/shared/errors';
import { UserService } from 'src/domain/users/services';
import { ProductApproveDto } from '../dtos';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: ProductRepository,
    private readonly userService: UserService,
  ) {}

  async findAllApproved(): Promise<IProduct[]> {
    const queryBuilder = this.productRepo.createQueryBuilder('product');
    const conditions = { isApproved: true };
    // Build the query dynamically
    buildQuery(queryBuilder, conditions, 'product');
    return await queryBuilder.getMany();
  }

  async findAllByUser(user: User): Promise<IProduct[]> {
    const queryBuilder = this.productRepo.createQueryBuilder('product');
    const conditions = { owner: user };
    // Build the query dynamically
    buildQuery(queryBuilder, conditions, 'product');
    return await queryBuilder.getMany();
  }

  async findAll(): Promise<IProduct[]> {
    return this.productRepo.find();
  }

  async findById(id: number, user: User): Promise<IProduct> {
    const queryBuilder = this.productRepo.createQueryBuilder('product');
    const conditions = { id, owner: user };
    // Build the query dynamically
    buildQuery(queryBuilder, conditions, 'product');
    const product = await queryBuilder.getOne();
    if (!product) {
      throw new NotFoundException(PRODUCT_NOT_FOUND);
    }
    return product;
  }

  async create(product: ProductCreateDto, user: IUser): Promise<IProduct> {
    const payload = {
      ...product,
      owner: user,
    };
    const newProduct = await this.productRepo.create(payload);
    const savedProduct = await this.productRepo.save(newProduct);
    return {
      ...savedProduct,
      owner: savedProduct.owner.toSafeObject(),
    };
  }

  async update(
    id: number,
    product: Partial<IProduct>,
    user: User,
  ): Promise<IProduct> {
    const productToUpdate = await this.findById(id, user);
    const updatedProduct = Object.assign(productToUpdate, product);
    return await this.productRepo.save(updatedProduct);
  }

  async removeById(id: number, user: User): Promise<void> {
    const product = await this.findById(id, user);
    await this.productRepo.remove(product as Product);
  }

  async approveProduct(
    id: number,
    userId: number,
    data: ProductApproveDto,
  ): Promise<IProduct> {
    const user = await this.userService.findOne({ id: userId });

    const queryBuilder = this.productRepo.createQueryBuilder('product');
    const conditions = { id, owner: user };

    buildQuery(queryBuilder, conditions, 'product');
    const product = await queryBuilder.getOne();

    const updatedProduct = Object.assign(product, data);
    return await this.productRepo.save(updatedProduct);
  }
}
