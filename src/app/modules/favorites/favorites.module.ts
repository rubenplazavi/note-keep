import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Notes } from '../notes/entities/notes.entity';
import { User } from '../users/entities/user.entity';
import { FavoritesController } from './favorites.controller';
import { AddFavoriteService } from './services/add-favorite.service';
import { FavoritesRepository } from './repository/typeORM/favoritesRepository';
import { UsersRepository } from '../users/persistency/typeORM/UsersRepository';
import { NotesRepository } from '../notes/persistency/typeORM/notesRepository';
import { RemoveFavoriteService } from './services/remove-favorite.service';
import { FindAllFavoritesService } from './services/find-all-favorites.service';
import { FindFavoriteNoteService } from './services/find-favorite-note.service';
import { FindPaginatedFavoritesService } from './services/find-paginated-favorites.service';
import { NoteFavoritedListener } from './events/note-favorited.listener';
import { NoteNotFavoritedListener } from './events/note-not-favorited.listener';
import { FindFavoritesByKeywordService } from './services/find-favorites-by-keyword.service';

@Module({
  imports: [TypeOrmModule.forFeature([Notes, User])],
  controllers: [FavoritesController],
  providers: [
    AddFavoriteService,
    FavoritesRepository,
    UsersRepository,
    NotesRepository,
    RemoveFavoriteService,
    FindAllFavoritesService,
    FindFavoriteNoteService,
    FindPaginatedFavoritesService,
    NoteFavoritedListener,
    NoteNotFavoritedListener,
    FindFavoritesByKeywordService
  ],
})
export class FavoritesModule {}
