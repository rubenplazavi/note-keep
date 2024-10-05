import { BadRequestException, Injectable } from '@nestjs/common';
import { FavoritesRepository } from '../repository/typeORM/favoritesRepository';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NoteFavoritedEvent } from '../events/note-favorited.event';

@Injectable()
export class RemoveFavoriteService {
  constructor(
    private readonly favoritesRepository: FavoritesRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async delete(id: string) {
    const note = await this.favoritesRepository.findNoteByID(id);

    const user = await this.favoritesRepository.findUserById(note.userId);

    const isFavorite = await this.favoritesRepository.isNoteFavoriteForUser(
      user.id,
      note.id,
    );
    if (!isFavorite) {
      throw new BadRequestException('The note is not in favorites');
    }

    user.favoriteNotes = user.favoriteNotes.filter((note) => note.id !== id);

    const response = await this.favoritesRepository.delete(id, user);

    this.eventEmitter.emit(
      'note.notFavorited',
      new NoteFavoritedEvent(user.id, note.id),
    );
    return delete response.password;
  }
}
