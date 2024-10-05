import { applyDecorators, BadRequestException } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TokenDto } from '../../dto/token-object.dto';

export function LoginDecorator(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ description: 'Login for validated users' }),

    ApiResponse({
      status: 200,
      description: 'successfully logged!',
      type: TokenDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad request',
      type: BadRequestException,
    }),
  );
}
