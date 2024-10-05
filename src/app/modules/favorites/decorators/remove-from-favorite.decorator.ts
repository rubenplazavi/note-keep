import {
  BadRequestException,
  UnauthorizedException,
  applyDecorators,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

export function RemoveFromFavoritesDecorator(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ description: 'looks for a favorite note' }),
    ApiParam({
      name: 'id',
      description: 'note id',
      required: true,
      type: UUID,
    }),
    ApiResponse({
      status: 200,
      description: 'response ok',
      type: Boolean,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad request',
      type: BadRequestException,
    }),
    ApiResponse({
      status: 401,
      description: 'unauthorized',
      type: UnauthorizedException,
    }),
  );
}
