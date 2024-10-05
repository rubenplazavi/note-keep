import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

export function DeleteUserDecorator(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ description: 'Deletes a user by its id' }),
    ApiParam({
      name: 'id',
      description: 'user id',
      required: true,
      type: UUID,
    }),
    ApiResponse({
      status: 200,
      description: 'succesfully deleted!',
    }),
    ApiResponse({
      status: 400,
      description: `Bad Request, not a valid id type`,
    }),
    ApiResponse({
      status: 404,
      description: `user not found or previously deleted`,
    }),
  );
}
