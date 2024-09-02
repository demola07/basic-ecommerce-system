import { ProductCreateDto } from './product-create.dto';

export class ProductUpdateDto implements Partial<ProductCreateDto> {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}
