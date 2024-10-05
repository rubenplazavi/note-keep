import { IsArray, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { NoteAndFavoritesResponseDto } from '../../notes/dto/note-and-favorites-response.dto';

export class PaginationResponseWithIsFavorite {
  @IsArray()
  @ApiProperty({
    name: 'notes',
    description: 'notes paginated',
    required: true,
    type: Array<NoteAndFavoritesResponseDto>,
  })
  notes: NoteAndFavoritesResponseDto[];

  @IsNumber()
  @ApiProperty({
    name: 'totalNotes',
    description: 'all notes from user',
    required: true,
    type: Number,
  })
  totalNotes: number;

  @ApiProperty({
    name: 'page',
    description: 'actual page that is listed',
    required: true,
    type: Number,
  })
  @IsNumber()
  page: number;

  @ApiProperty({
    name: 'lastPage',
    description: 'Total of pages to paginated',
    required: true,
    type: Number,
  })
  @IsNumber()
  lastPage: number;

  constructor(
    notes: NoteAndFavoritesResponseDto[],
    totalNotes: number,
    page: number,
    lastPage: number,
  ) {
    this.notes = notes;
    this.totalNotes = totalNotes;
    this.page = page;
    this.lastPage = lastPage;
  }

  static create(
    notes: NoteAndFavoritesResponseDto[],
    totalNotes: number,
    page: number,
    lastPage: number,
  ) {
    return new PaginationResponseWithIsFavorite(
      notes,
      totalNotes,
      page,
      lastPage,
    );
  }
}
