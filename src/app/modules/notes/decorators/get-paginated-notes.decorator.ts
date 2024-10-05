import {
  NotFoundException,
  UnauthorizedException,
  applyDecorators,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { PaginationResponseWithIsFavorite } from '../../common/pagination/pagination-with-is-favorite.dto';

export function GetPaginatedNotesDecorator(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ description: 'Gets a user by id or email' }),
    ApiParam({
      name: 'id',
      description: 'user id',
      required: true,
      type: UUID,
    }),

    ApiQuery({
      name: 'page',
      required: false,
      description: 'Page number',
      type: Number,
      example: 1,
    }),
    ApiQuery({
      name: 'limit',
      required: false,
      description: 'Number of items per page',
      type: Number,
      example: 10,
    }),
    ApiResponse({
      status: 200,
      description: 'gets paginated notes',
      type: PaginationResponseWithIsFavorite,
    }),
    ApiResponse({
      status: 401,
      description: 'unauthorized',
      type: UnauthorizedException,
    }),
    ApiResponse({
      status: 404,
      description: 'user not found',
      type: NotFoundException,
    }),
  );
}
