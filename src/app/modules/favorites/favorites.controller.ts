import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AddFavoriteService } from './services/add-favorite.service';
import { GetUser } from '../common/decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { AuthNoteOwnerGuard } from '../notes/guards/auth-note-owner.guard';
import { RemoveFavoriteService } from './services/remove-favorite.service';
import { FindAllFavoritesService } from './services/find-all-favorites.service';
import { FindFavoriteNoteService } from './services/find-favorite-note.service';
import { AuthGenericOwnerGuard } from '../common/guards/auth-generic-owner.guard';
import { AddFavoriteDecorator } from './decorators/add-favorite.decorator';
import { GetFavoriteNoteDecorator } from './decorators/get-favorite-note.decorator';
import { GetAllFavoritesDecorator } from './decorators/get-all-favorites.decorator';
import { RemoveFromFavoritesDecorator } from './decorators/remove-from-favorite.decorator';
import { FindPaginatedFavoritesService } from './services/find-paginated-favorites.service';
import { PaginationQueryDto } from '../common/pagination/pagination-query.dto';
import { GetPaginatedFavoritesDecorator } from './decorators/get-paginated-favorites.decorator';
import { GetAllFavoritesWithIsFavoriteDecorator } from './decorators/get-all-favorites-with-isfavorite.decorator';
import { AuthGuard } from '@nestjs/passport';
import { SearchByKeywordDto } from '../notes/dto/search-by-keywor.dto';
import { FindFavoritesByKeywordService } from './services/find-favorites-by-keyword.service';
import { SearchFavoritesByKeywordDecorator } from './decorators/search-favorites-by-keyword.decorator';

@ApiTags('Favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(
    private readonly addFavoriteService: AddFavoriteService,
    private readonly removeFavoriteService: RemoveFavoriteService,
    private readonly findAllFavoritesService: FindAllFavoritesService,
    private readonly findFavoriteNoteService: FindFavoriteNoteService,
    private readonly findPaginatedFavoritesService: FindPaginatedFavoritesService,
    private readonly findFavoritesByKeywordService: FindFavoritesByKeywordService
  ) {}

  @Post(':id')
  @AddFavoriteDecorator()
  @AuthNoteOwnerGuard()
  addFavorite(@Param('id', ParseUUIDPipe) id: string, @GetUser() user: User) {
    return this.addFavoriteService.add(id, user);
  }

  @Get('search-favorites')
  @SearchFavoritesByKeywordDecorator()
  @UseGuards(AuthGuard('jwt'))
  findNotesByKeyword(@Query('keyword') keyword: string, @GetUser() user: User) {
    const key = SearchByKeywordDto.create(keyword);
    return this.findFavoritesByKeywordService.findFavoritesByKeyword(user.id, key);
  }

  @Get('user/:id')
  @GetAllFavoritesDecorator()
  @AuthGenericOwnerGuard()
  getAllUserFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return this.findAllFavoritesService.getFavoritesByUserId(id);
  }

  @Get('user/:id/paginated-favorites')
  @GetPaginatedFavoritesDecorator()
  @AuthGenericOwnerGuard()
  getPaginatedFavorites(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() pagination: PaginationQueryDto,
  ) {
    const { limit = 10, page = 1, sortField='createdAt', sortOrder='DESC' } = pagination;
    return this.findPaginatedFavoritesService.findPaginatedFavorites(id, {
      limit,
      page,
      sortField,
      sortOrder
    });
  }

  @Get('note/:id')
  @GetFavoriteNoteDecorator()
  @AuthNoteOwnerGuard()
  getFavoriteNote(@Param('id', ParseUUIDPipe) id: string) {
    return this.findFavoriteNoteService.getFavoriteByNoteId(id);
  }

  @Get('isfavorite/:id')
  @GetAllFavoritesWithIsFavoriteDecorator()
  @AuthGenericOwnerGuard()
  getAllUserFavoritesWithIsFavorite(@Param('id', ParseUUIDPipe) id: string) {
    return this.findAllFavoritesService.getFavoritesWithIsFavoriteByUserId(id);
  }

  @Delete(':id')
  @RemoveFromFavoritesDecorator()
  @AuthNoteOwnerGuard()
  deleteFavorite(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeFavoriteService.delete(id);
  }
}
