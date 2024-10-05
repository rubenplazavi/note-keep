import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

export function UpdateUserDecorator(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ description: 'Update user details' }),
    ApiBody({
      description: 'creates a new user',
      type: UpdateUserDto,
      examples: {
        example1: {
          value: {
            username: 'marioNuevoUsername',
            email: 'mario@gmailo.com',
            password: 'User_123',
          },
        },
      },
    }),
    ApiParam({
      name: 'id',
      description: 'user id',
      required: true,
      type: UUID,
    }),
    ApiResponse({
      status: 200,
      description: 'succesfully updated!',
      type: CreateUserDto,
    }),
    ApiResponse({
      status: 404,
      description: 'user not found',
    }),
    ApiResponse({
      status: 409,
      description: 'username is already in use',
    }),
  );
}
