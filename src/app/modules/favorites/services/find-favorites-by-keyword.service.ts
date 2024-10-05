import { Injectable } from "@nestjs/common";
import { FavoritesRepository } from "../repository/typeORM/favoritesRepository";
import { NotesRepository } from "../../notes/persistency/typeORM/notesRepository";
import { SearchByKeywordDto } from "../../notes/dto/search-by-keywor.dto";

@Injectable()
export class FindFavoritesByKeywordService {
  constructor(
    private favoritesRepository: FavoritesRepository,
    private notesRepository: NotesRepository,
  ) {}

  
  async findFavoritesByKeyword(userId: string, keyword: SearchByKeywordDto){
    return await this.notesRepository.findFavoritesByKeyword(userId, keyword);
  }
}