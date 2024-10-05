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
import { NoteResponseDto } from '../dto/note-response.dto';

export function GetNoteDecorator(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ description: 'Gets a note by its id' }),
    ApiParam({
      name: 'id',
      description: 'note id',
      required: true,
      type: UUID,
    }),
    ApiResponse({
      status: 200,
      description: 'gets a note by id',
      type: NoteResponseDto,
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
