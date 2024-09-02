import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, } from 'class-validator';
export class ProductApproveDto {
  @ApiProperty({
    example: true,
    required: true,
  })
  @IsNotEmpty()
  isApproved: boolean;
}
