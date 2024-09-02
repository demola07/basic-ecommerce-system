// import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, IsString } from 'class-validator';
import { CreateAdminDto } from './admin-create.dto';

export class UpdateAdminDto implements Partial<CreateAdminDto> {
  // @ApiProperty({
  //   example: 'username',
  //   required: true,
  // })
  @IsNotEmpty()
  @IsString()
  name: string;
}
