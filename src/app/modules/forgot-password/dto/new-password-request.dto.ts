import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class NewPasswordRequest {
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  @ApiProperty({
    name: 'newPassword',
    description: 'users new password',
    required: true,
    type: String,
  })
  password: string;
}
