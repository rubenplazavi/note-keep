import { BadRequestException, applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiSecurity } from '@nestjs/swagger';
import { TokenDto } from '../../dto/token-object.dto';

export function TokenDecorator(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ description: 'Refresh jwt Token' }),

    ApiSecurity('bearer'),
    ApiResponse({
      status: 201,
      description: 'successfully created!',
      type: TokenDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad request',
      type: BadRequestException,
    }),
  );
}
