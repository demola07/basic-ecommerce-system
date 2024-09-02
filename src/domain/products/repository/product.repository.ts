import { Product } from 'src/application/entities';
import { Repository } from 'typeorm';

export class ProductRepository extends Repository<Product> {}
