import {
  ForbiddenException,
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

export function DeleteNoteDecorator(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ description: 'Deletes a note by note id' }),
    ApiParam({
      name: 'id',
      description: 'note id',
      required: true,
      type: UUID,
    }),
    ApiResponse({
      status: 200,
      description: 'succesfully deleted!',
      type: Boolean,
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
      type: UnauthorizedException,
    }),
    ApiResponse({
      status: 403,
      description: 'Error verifying note or ownership',
      type: ForbiddenException,
    }),
  );
}
