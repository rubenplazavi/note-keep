import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NoteOwnershipGuard } from './note-ownership.guard';

export function AuthNoteOwnerGuard(): MethodDecorator {
  return applyDecorators(UseGuards(AuthGuard('jwt'), NoteOwnershipGuard));
}
