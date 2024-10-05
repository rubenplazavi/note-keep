import {
  NotFoundException,
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
import { NoteAndFavoritesResponseDto } from '../dto/note-and-favorites-response.dto';

export function GetAllUserNotesDecorator(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ description: 'Gets all notes from user by id' }),
    ApiParam({
      name: 'id',
      description: 'user id',
      required: true,
      type: UUID,
    }),
    ApiResponse({
      status: 200,
      description: 'gets all notes from user',
      type: [NoteAndFavoritesResponseDto],
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
