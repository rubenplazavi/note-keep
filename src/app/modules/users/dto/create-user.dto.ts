import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  MinLength,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({
    name: 'email',
    description: 'users email',
    required: true,
    type: String,
  })
  email: string;

  @IsString()
  @IsStrongPassword()
  @ApiProperty({
    name: 'password',
    description: 'users password',
    required: true,
    type: String,
  })
  password: string;

  @IsString()
  @MinLength(1)
  @ApiProperty({
    name: 'username',
    description: 'username',
    required: true,
    type: String,
  })
  username: string;

  constructor(email: string, password: string, username: string) {
    this.email = email;
    this.password = password;
    this.username = username;
  }
}
