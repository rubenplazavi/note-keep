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
import { UserRequestWithFavoritesDto } from '../dto/user-without-password-favorites.dto';

export function AddFavoriteDecorator(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ description: 'Adds an existing note into favarite notes' }),
    ApiParam({
      name: 'id',
      description: 'note id',
      required: true,
      type: UUID,
    }),
    ApiResponse({
      status: 200,
      description: 'favorite added correctly',
      type: UserRequestWithFavoritesDto,
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
