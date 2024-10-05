import { Injectable } from '@nestjs/common';
import { NotesRepository } from '../persistency/typeORM/notesRepository';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class DeleteNoteService {
  constructor(private readonly notesRepository: NotesRepository) {}

  @OnEvent('user.deleted')
  async deleteAllNotesFromDeletedUser(userId: string) {
    return this.notesRepository.deleteAll(userId);
  }

  async delete(id: string) {
    return this.notesRepository.delete(id);
  }
}
