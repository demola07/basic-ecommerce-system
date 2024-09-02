import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, IsString } from 'class-validator';

export class UserLoginDto {
  @ApiProperty({
    example: 'user@gmail.com',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    example: 'password1234',
    required: true,
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
