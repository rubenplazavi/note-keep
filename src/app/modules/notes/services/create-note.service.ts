import { Injectable } from '@nestjs/common';

import { Notes } from '../entities/notes.entity';
import { CreateNoteDto } from '../dto/create-note.dto';
import { NotesRepository } from '../persistency/typeORM/notesRepository';

@Injectable()
export class CreateNoteService {
  constructor(private readonly notesRepository: NotesRepository) {}

  create(createNoteDto: CreateNoteDto, userId: string) {
    const { tittle, content } = createNoteDto;
    const note = Notes.create(userId, tittle, content);

    return this.notesRepository.create(note);
  }
}
