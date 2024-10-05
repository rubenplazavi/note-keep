import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({
    name: 'refreshToken',
    description: 'jwt token',
    required: true,
    type: String,
  })
  token: string;
}
