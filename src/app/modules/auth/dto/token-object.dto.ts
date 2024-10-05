import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty({
    name: 'token',
    description: 'jwt token',
    required: true,
    type: String,
  })
  token: string;
}
