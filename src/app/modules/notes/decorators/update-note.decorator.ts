import {
  NotFoundException,
  UnauthorizedException,
  applyDecorators,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { NoteResponseDto } from '../dto/note-response.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';

export function UpdateNoteDecorator(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ description: 'updates a note by id' }),
    ApiParam({
      name: 'id',
      description: 'note id',
      required: true,
      type: UUID,
    }),
    ApiBody({
      description: 'updates an existing note',
      type: UpdateNoteDto,
      examples: {
        example1: {
          value: {
            tittle: 'mi nota 1',
            content: 'Esta es mi primera nota',
          },
        },
      },
    }),
    ApiResponse({
      status: 200,
      description: 'note updated',
      type: NoteResponseDto,
    }),
    ApiResponse({
      status: 401,
      description: 'unauthorized',
      type: UnauthorizedException,
    }),
    ApiResponse({
      status: 404,
      description: 'note not found',
      type: NotFoundException,
    }),
  );
}
