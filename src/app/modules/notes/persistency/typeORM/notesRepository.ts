import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notes } from '../../entities/notes.entity';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from 'src/app/modules/common/pagination/pagination-query.dto';
import { PaginationResponse } from '../../../common/pagination/pagination-response.dto';
import { SearchByKeywordDto } from '../../dto/search-by-keywor.dto';
import { NoteResponseDto } from '../../dto/note-response.dto';
import { UsersRepository } from 'src/app/modules/users/persistency/typeORM/UsersRepository';
import { NoteAndFavoritesResponseDto } from '../../dto/note-and-favorites-response.dto';
import { PaginationResponseWithIsFavorite } from 'src/app/modules/common/pagination/pagination-with-is-favorite.dto';
import { DynamicData } from 'src/config/types/types';

@Injectable()
export class NotesRepository {
  constructor(
    @InjectRepository(Notes) private readonly repository: Repository<Notes>,
    private readonly usersRepository: UsersRepository,
  ) {}

  async create(note: Notes) {
    return this.repository.save(note);
  }

  async update(note: Notes) {
    return this.repository.save(note);
  }

  async findById(id: string) {
    const note = await this.repository.findOneBy({ id });
    if (!note) {
      throw new NotFoundException('note not found!');
    }
    return note;
  }

  async findUserNotes(userId: string) {
    return this.repository.findBy({ userId });
  }

  async findPaginatedUserNotes(
    userId: string,
    paginationQuery: PaginationQueryDto = { limit: 10, page: 1 },
  ) {
    const { page, limit } = paginationQuery;
    const [notes, total] = await this.repository.findAndCount({
      where: { userId },
      take: limit,
      skip: (page - 1) * limit,
    });

    const lastPage = Math.ceil(total / limit);
    const paginationResponse = new PaginationResponse(
      notes,
      total,
      page,
      lastPage,
    );
    return paginationResponse;
  }

  async findPaginatedUserNotesWithIsFavorite(
    userId: string,
    paginationQuery: PaginationQueryDto = { limit: 10, page: 1, sortField: 'createdAt', sortOrder: 'DESC' },
  ) {
    const { page, limit, sortField, sortOrder } = paginationQuery;

    const orderBy = this.getOrder(sortField, sortOrder)

    const [notes, total] = await this.repository.findAndCount({
      where: { userId },
      take: limit,
      skip: (page - 1) * limit,
      order: orderBy,
    });

    const user = await this.usersRepository.findUserWithRelationFavoritesById(
      userId,
    );
    const favoriteNoteIds = user.favoriteNotes.map((note) => note.id);

    const notesResponseDto = notes.map((note) => {
      const isFavorite = favoriteNoteIds.includes(note.id);
      const noteDto = new NoteAndFavoritesResponseDto(note, isFavorite);

      return noteDto;
    });

    const lastPage = Math.ceil(total / limit);
    const paginationResponse = new PaginationResponseWithIsFavorite(
      notesResponseDto,
      total,
      page,
      lastPage,
    );
    return paginationResponse;
  }

  private getOrder(sortField: string, sortOrder: string){
    const order = {};
    order[sortField] = sortOrder;
    return order;
  }
  async findPaginatedFavoritesByUserId(
    userId: string,
    pagination: PaginationQueryDto,
  ): Promise<PaginationResponseWithIsFavorite> {
    const { page, limit, sortField, sortOrder } = pagination;

    const queryBuilder = this.repository
      .createQueryBuilder('notes')
      .innerJoin('notes.favoritedBy', 'user', 'user.id = :userId', { userId })
      .take(limit)
      .skip((page - 1) * limit);

    queryBuilder.orderBy(`notes.${sortField}`, sortOrder);

    const [favorites, total] = await queryBuilder.getManyAndCount();

    const favoritesWithIsFavorite = favorites.map((favorite) =>
      NoteAndFavoritesResponseDto.create(favorite, true),
    );

    const lastPage = Math.ceil(total / limit);
    const paginationResponse = new PaginationResponseWithIsFavorite(
      favoritesWithIsFavorite,
      total,
      page,
      lastPage,
    );
    return paginationResponse;
  }

  async delete(id: string) {
    const rowsDeleted = await this.repository.delete(id);
    return rowsDeleted.affected === 1;
  }

  async deleteAll(userId: string) {
    const rowsDeleted = await this.repository.delete({ userId });
    return rowsDeleted.affected;
  }

  async findNotesByKeyword(
    keyword: SearchByKeywordDto,
    userId: string,
  ): Promise<NoteResponseDto[]> {
    const key = keyword.keyword;
    try {
      return this.repository
        .createQueryBuilder('notes')
        .where('notes.tittle ILIKE :key OR notes.content ILIKE :key', {
          key: `%${key}%`,
        })
        .andWhere('notes.userId = :userId', { userId })
        .getMany();
    } catch (error) {
      throw new InternalServerErrorException(
        'uppss, something went wrong in the server',
      );
    }
  }

  async findFavoritesByKeyword(userId: string, keyword: SearchByKeywordDto) {
    const key = `%${keyword.keyword}%`;

    const queryBuilder = this.repository
      .createQueryBuilder('notes')
      .innerJoin('notes.favoritedBy', 'user', 'user.id = :userId', { userId })
      .where('notes.tittle ILIKE :key OR notes.content ILIKE :key', { key });

    const favorites = await queryBuilder.getMany();
    //Todo para no añadir campo --> return favorites;

    return favorites.map((note) => ({
      ...note,
      isFavorite: true,
    }));
  }

  async createNoteResponse(notes: Notes[], userId: string) {
    const favoriteNoteIds = await this.getFavoriteNotesIds(userId);

    const notesResponseDto = notes.map((note) => {
      const isFavorite = favoriteNoteIds.includes(note.id);
      const noteDto = new NoteAndFavoritesResponseDto(note, isFavorite);

      return noteDto;
    });

    return notesResponseDto;
  }
  async getFavoriteNotesIds(userId: string) {
    const user = await this.usersRepository.findUserWithRelationFavoritesById(
      userId,
    );

    return user.favoriteNotes.map((note) => note.id);
  }
}
