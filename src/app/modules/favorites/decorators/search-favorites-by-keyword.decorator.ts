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
import { NoteResponseDto } from '../../notes/dto/note-response.dto';
  
  
  export function SearchFavoritesByKeywordDecorator(): MethodDecorator {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({ description: 'search favorites that match a keyword search' }),
      ApiQuery({
        name: 'keyword',
        description: 'keyword to search for in favorites',
        required: true,
        type: String,
      }),
      ApiResponse({
        status: 200,
        description: 'gets favorites by keyword',
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
  