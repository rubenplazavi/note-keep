import { Injectable } from '@nestjs/common';
import { UpdateNoteDto } from '../dto/update-note.dto';
import { NotesRepository } from '../persistency/typeORM/notesRepository';

@Injectable()
export class UpdateNoteService {
  constructor(private readonly notesRepository: NotesRepository) {}

  async update(updateNoteDto: UpdateNoteDto, noteId: string) {
    const note = await this.notesRepository.findById(noteId);

    note.tittle = updateNoteDto.tittle;
    note.content = updateNoteDto.content;

    return this.notesRepository.update(note);
  }
}
