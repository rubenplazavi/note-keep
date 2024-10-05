import { Injectable } from '@nestjs/common';
import { NotesRepository } from '../persistency/typeORM/notesRepository';
import { PaginationQueryDto } from '../../common/pagination/pagination-query.dto';
import { SearchByKeywordDto } from '../dto/search-by-keywor.dto';
import { UsersRepository } from '../../users/persistency/typeORM/UsersRepository';
import { NoteAndFavoritesResponseDto } from '../dto/note-and-favorites-response.dto';

@Injectable()
export class FindNoteService {
  constructor(
    private readonly notesRepository: NotesRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  findById(noteId: string) {
    return this.notesRepository.findById(noteId);
  }

  // Todo parece que no hace falta findNotesByUserId(userId: string) {return this.notesRepository.findUserNotes(userId);}

  findPaginatedNotesByUserId(
    userId: string,
    paginationQuery: PaginationQueryDto,
  ) {
    return this.notesRepository.findPaginatedUserNotesWithIsFavorite(
      userId,
      paginationQuery,
    );
  }

  findNotesByKeyword(keyword: SearchByKeywordDto, userId: string) {
    return this.notesRepository.findNotesByKeyword(keyword, userId);
  }

  async findAllNotesForUser(
    userId: string,
  ): Promise<NoteAndFavoritesResponseDto[]> {
    const notes = await this.notesRepository.findUserNotes(userId);

    const user = await this.usersRepository.findUserWithRelationFavoritesById(
      userId,
    );
    const favoriteNoteIds = user.favoriteNotes.map((note) => note.id);

    return notes.map((note) => {
      const isFavorite = favoriteNoteIds.includes(note.id);
      const noteDto = new NoteAndFavoritesResponseDto(note, isFavorite);

      return noteDto;
    });
  }
}
