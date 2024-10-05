import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserResponseDto } from '../dto/create-user-response.dto';

export function GetAllUsersDecorator(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ description: 'Get all users details' }),
    ApiResponse({
      status: 200,
      description: 'gets all users information',
      type: CreateUserResponseDto,
    }),
  );
}
