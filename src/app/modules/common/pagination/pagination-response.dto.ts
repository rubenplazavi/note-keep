import { IsArray, IsNumber } from 'class-validator';
import { Notes } from '../../notes/entities/notes.entity';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationResponse {
  @IsArray()
  @ApiProperty({
    name: 'notes',
    description: 'notes paginated',
    required: true,
    type: Array<Notes>,
  })
  notes: Notes[];

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
    notes: Notes[],
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
    notes: Notes[],
    totalNotes: number,
    page: number,
    lastPage: number,
  ) {
    return new PaginationResponse(notes, totalNotes, page, lastPage);
  }
}
