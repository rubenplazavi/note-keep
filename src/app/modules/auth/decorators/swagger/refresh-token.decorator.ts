import { BadRequestException, applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiSecurity } from '@nestjs/swagger';
import { RefreshTokenDto } from '../../dto/refreshToken-object.dto';

export function RefreshTokenDecorator(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ description: 'Refresh jwt Token' }),

    ApiSecurity('bearer'),
    ApiResponse({
      status: 201,
      description: 'successfully created!',
      type: RefreshTokenDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad request',
      type: BadRequestException,
    }),
  );
}
