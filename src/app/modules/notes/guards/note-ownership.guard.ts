import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { NotesRepository } from '../persistency/typeORM/notesRepository';
import { validate as uuidValidate } from 'uuid';

@Injectable()
export class NoteOwnershipGuard implements CanActivate {
  constructor(private notesRepository: NotesRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;
    const noteId = request.params.id;

    if (!userId || !noteId) {
      throw new ForbiddenException('Invalid user or note ID');
    }

    this.validateUUID(noteId);

    try {
      const note = await this.notesRepository.findById(noteId);
      this.validateOwner(note.userId, userId);

      return true;
    } catch (error) {
      throw new ForbiddenException('Error verifying note or ownership');
    }
  }

  validateUUID(id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('not a valid uuid');
    }
  }

  validateOwner(noteId: string, userId: string) {
    if (noteId !== userId) {
      throw new ForbiddenException('You do not own this note');
    }
  }
}
