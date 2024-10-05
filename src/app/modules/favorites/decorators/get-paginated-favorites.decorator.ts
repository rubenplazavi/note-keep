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
import { PaginationResponse } from '../../common/pagination/pagination-response.dto';
import { PaginationQueryDto } from '../../common/pagination/pagination-query.dto';

export function GetPaginatedFavoritesDecorator(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      description: 'Gets all favourite notes from a especific user',
    }),
    ApiParam({
      name: 'id',
      description: 'user id',
      required: true,
      type: UUID,
    }),
    ApiParam({
      name: 'paginationDto',
      description: 'user id',
      required: true,
      type: PaginationQueryDto,
    }),
    ApiResponse({
      status: 200,
      description: 'request ok',
      type: PaginationResponse,
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
