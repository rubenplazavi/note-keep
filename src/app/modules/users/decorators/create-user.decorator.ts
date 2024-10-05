import { BadRequestException, applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreateUserResponseDto } from '../dto/create-user-response.dto';

export function CreateUserDecorator(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ description: 'Creates a new user' }),
    ApiBody({
      description: 'creates a new user',
      type: CreateUserDto,
      examples: {
        example1: {
          value: {
            username: 'ruben',
            email: 'ruben.plaza@kubide.es',
            password: 'User_123',
          },
        },
      },
    }),
    ApiResponse({
      status: 201,
      description: 'successfully created!',
      type: CreateUserResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad request',
      type: BadRequestException,
    }),
  );
}
