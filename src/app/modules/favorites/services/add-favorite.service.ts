import { BadRequestException, Injectable } from '@nestjs/common';
import { FavoritesRepository } from '../repository/typeORM/favoritesRepository';
import { User } from '../../users/entities/user.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NoteFavoritedEvent } from '../events/note-favorited.event';

@Injectable()
export class AddFavoriteService {
  constructor(
    private readonly favoritesRepository: FavoritesRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async add(id: string, user: User) {
    const note = await this.favoritesRepository.findNoteByID(id);

    const userExist = await this.favoritesRepository.findUserById(user.id);

    if (!userExist.favoriteNotes) {
      userExist.favoriteNotes = [];
    }

    const isFavorite = await this.favoritesRepository.isNoteFavoriteForUser(
      userExist.id,
      note.id,
    );
    if (isFavorite) {
      throw new BadRequestException('Note already in favorites');
    }

    userExist.favoriteNotes.push(note);
    this.favoritesRepository.saveFavorite(userExist);

    delete userExist.password;

    this.eventEmitter.emit(
      'note.favorited',
      new NoteFavoritedEvent(userExist.id, note.id),
    );
    return userExist;
  }
}
