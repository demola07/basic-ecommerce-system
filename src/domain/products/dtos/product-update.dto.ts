
import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsNotEmpty,
  IsString,
  IsNumberString,
} from 'class-validator';
import { ProductCreateDto } from './product-create.dto';

export class ProductUpdateDto implements Partial<ProductCreateDto> {
  @ApiProperty({
    example: 'name',
    required: true,
  })
  @IsNotEmpty()
  @IsNumberString()
  id: number;

  @ApiProperty({
    example: 'name',
    required: true,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 2000,
    required: true,
  })
  @IsOptional()
  @IsNumberString()
  price?: number;

  @ApiProperty({
    example: 'this is a description',
    required: true,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 10,
    required: true,
  })
  @IsOptional()
  @IsNumberString()
  quantity?: number;
}
