import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from 'src/app/modules/common/pagination/pagination-query.dto';
import { PaginationResponseWithIsFavorite } from 'src/app/modules/common/pagination/pagination-with-is-favorite.dto';
import { NotesRepository } from 'src/app/modules/notes/persistency/typeORM/notesRepository';
import { User } from 'src/app/modules/users/entities/user.entity';
import { UsersRepository } from 'src/app/modules/users/persistency/typeORM/UsersRepository';

@Injectable()
export class FavoritesRepository {
  constructor(
    private userRepository: UsersRepository,
    private notesRepository: NotesRepository,
  ) {}

  async findNoteByID(id: string) {
    return this.notesRepository.findById(id);
  }

  async findUserById(id: string) {
    return await this.userRepository.findUserWithRelationFavoritesById(id);
  }

  async saveFavorite(user: User) {
    return this.userRepository.save(user);
  }

  async delete(id: string, user: User) {
    this.checkIfNoteExist;

    return await this.userRepository.save(user);
  }

  async checkIfNoteExist(id: string) {
    return await this.findNoteByID(id);
  }

  async isNoteFavoriteForUser(
    usersId: string,
    notesId: string,
  ): Promise<boolean> {
    return this.userRepository.isNoteFavoriteForUser(usersId, notesId);
  }

  async findPaginatedFavoritesByUserId(
    userId: string,
    pagination: PaginationQueryDto,
  ): Promise<PaginationResponseWithIsFavorite> {
    return this.notesRepository.findPaginatedFavoritesByUserId(
      userId,
      pagination,
    );
  }
}
