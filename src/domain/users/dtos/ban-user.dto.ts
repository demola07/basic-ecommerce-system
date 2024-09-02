// import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, } from 'class-validator';

export class BanUserDto {
  @IsNotEmpty()
  isBanned: boolean;
}
