import {
  BadRequestException,
  UnauthorizedException,
  applyDecorators,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateNoteDto } from '../dto/create-note.dto';
import { NoteResponseDto } from '../dto/note-response.dto';

export function CreateNoteDecorator(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ description: 'Creates a new note' }),
    ApiBody({
      description: 'creates a new note',
      type: CreateNoteDto,
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
      status: 201,
      description: 'successfully created!',
      type: NoteResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad request',
      type: BadRequestException,
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
      type: UnauthorizedException,
    }),
  );
}
