import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @ApiProperty({
    name: 'email',
    description: 'users email',
    required: true,
    type: String,
  })
  email: string;
}
