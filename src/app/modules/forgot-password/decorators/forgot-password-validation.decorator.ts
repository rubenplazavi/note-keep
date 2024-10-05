import {
  applyDecorators,
  BadRequestException,
  RequestTimeoutException,
} from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { NewPasswordRequest } from '../dto/new-password-request.dto';
import { UserWithoutPasswordDto } from '../dto/user-without-password.dto';

export function UpdatedPasswordDecorator(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ description: 'Creates a new forgot password request' }),
    ApiBody({
      description: 'Email where we will send a reset-password link',
      type: NewPasswordRequest,
      examples: {
        example1: {
          value: {
            newPassword: 'User_123',
          },
        },
      },
    }),
    ApiResponse({
      status: 200,
      description: 'successfully password changed',
      type: UserWithoutPasswordDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad request',
      type: BadRequestException,
    }),
    ApiResponse({
      status: 408,
      description: 'Reset password request has expired',
      type: RequestTimeoutException,
    }),
  );
}
