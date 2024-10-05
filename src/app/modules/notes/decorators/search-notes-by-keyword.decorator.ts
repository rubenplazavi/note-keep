import {
  applyDecorators,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';

import { NoteResponseDto } from '../dto/note-response.dto';

export function SearchNotesByKeywordDecorator(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ description: 'search notes that match a keyword search' }),
    ApiQuery({
      name: 'keyword',
      description: 'note id',
      required: true,
      type: String,
    }),
    ApiResponse({
      status: 200,
      description: 'gets paginated notes',
      type: [NoteResponseDto],
    }),
    ApiResponse({
      status: 401,
      description: 'unauthorized',
      type: UnauthorizedException,
    }),
    ApiResponse({
      status: 400,
      description: 'user not found',
      type: BadRequestException,
    }),
  );
}
