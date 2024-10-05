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
import { NoteAndFavoritesResponseDto } from '../../notes/dto/note-and-favorites-response.dto';

export function GetAllFavoritesWithIsFavoriteDecorator(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      description: 'Gets all favarite notes from a especific user',
    }),
    ApiParam({
      name: 'id',
      description: 'user id',
      required: true,
      type: UUID,
    }),
    ApiResponse({
      status: 200,
      description: 'request ok',
      type: [NoteAndFavoritesResponseDto],
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
