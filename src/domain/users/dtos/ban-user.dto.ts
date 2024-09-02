import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, } from 'class-validator';

export class BanUserDto {
  @ApiProperty({
    example: true,
    required: true,
  })
  @IsNotEmpty()
  isBanned: boolean;
}
