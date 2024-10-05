import { NotFoundException, applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { UserResponseDto } from '../dto/user-response.dto';

export function GetUserDecorator(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ description: 'Gets a user by id or email' }),
    ApiParam({
      name: 'id',
      description: 'user id',
      required: true,
      type: UUID,
    }),
    ApiResponse({
      status: 200,
      description: 'gets user information',
      type: UserResponseDto,
    }),
    ApiResponse({
      status: 404,
      description: 'user not found',
      type: NotFoundException,
    }),
  );
}
