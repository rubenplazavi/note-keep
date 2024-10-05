import { Injectable } from '@nestjs/common';
import { NotesRepository } from '../../notes/persistency/typeORM/notesRepository';

@Injectable()
export class FindFavoriteNoteService {
  constructor(private readonly notesRepository: NotesRepository) {}

  async getFavoriteByNoteId(id: string) {
    return await this.notesRepository.findById(id);
  }
}
