import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateAdminDto } from './admin-create.dto';

export class UpdateAdminDto implements Partial<CreateAdminDto> {
  @ApiProperty({
    example: 'name',
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
