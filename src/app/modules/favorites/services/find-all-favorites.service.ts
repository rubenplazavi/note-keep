import { Injectable } from '@nestjs/common';
import { FavoritesRepository } from '../repository/typeORM/favoritesRepository';
import { NotesRepository } from '../../notes/persistency/typeORM/notesRepository';
import { NoteAndFavoritesResponseDto } from '../../notes/dto/note-and-favorites-response.dto';

@Injectable()
export class FindAllFavoritesService {
  constructor(
    private favoritesRepository: FavoritesRepository,
    private notesRepository: NotesRepository,
  ) {}

  async getFavoritesByUserId(id: string) {
    const user = await this.favoritesRepository.findUserById(id);

    return user.favoriteNotes;
  }

  async getFavoritesWithIsFavoriteByUserId(id: string) {
    const favorites = await this.getFavoritesByUserId(id);

    return favorites.map((note) =>
      NoteAndFavoritesResponseDto.create(note, true),
    );
  }
}
