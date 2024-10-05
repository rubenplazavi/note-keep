import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class ForgotPasswordEmailRequest {
  @IsString()
  @IsEmail()
  @ApiProperty({
    name: 'email',
    description: 'users email',
    required: true,
    type: String,
  })
  email: string;
}
