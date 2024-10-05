import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthCredentialsDto {
  @ApiProperty({
    name: 'email',
    type: String,
    required: true,
    description: "User's email to loggin with",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    name: 'password',
    type: String,
    required: true,
    description: "User's password to loggin with",
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
