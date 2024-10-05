import { Injectable } from '@nestjs/common';
import { FavoritesRepository } from '../repository/typeORM/favoritesRepository';
import { PaginationQueryDto } from '../../common/pagination/pagination-query.dto';
import { PaginationResponseWithIsFavorite } from '../../common/pagination/pagination-with-is-favorite.dto';

@Injectable()
export class FindPaginatedFavoritesService {
  constructor(private readonly favoriteRepository: FavoritesRepository) {}

  async findPaginatedFavorites(
    id: string,
    pagination: PaginationQueryDto,
  ): Promise<PaginationResponseWithIsFavorite> {
    return await this.favoriteRepository.findPaginatedFavoritesByUserId(
      id,
      pagination,
    );
  }
}
