import { applyDecorators, BadRequestException } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { ForgotPasswordEmailRequest } from '../dto/forgot-password-email-request.dto';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

export function ForgotPasswordRequestDecorator(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ description: 'Creates a new forgot password request' }),
    ApiBody({
      description: 'Email where we will send a reset-password link',
      type: ForgotPasswordEmailRequest,
      examples: {
        example1: {
          value: {
            email: 'ruben.plaza@kubide.es',
          },
        },
      },
    }),
    ApiResponse({
      status: 200,
      description: 'successfully created!',
      type: UUID,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad request',
      type: BadRequestException,
    }),
  );
}
