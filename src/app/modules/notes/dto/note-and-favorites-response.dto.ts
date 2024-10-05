import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { Notes } from '../entities/notes.entity';

export class NoteAndFavoritesResponseDto {
  @ApiProperty({
    name: 'id',
    description: 'note id (uuid)',
    required: true,
    type: UUID,
  })
  id: string;

  @ApiProperty({
    name: 'UserId',
    description: 'user id (uuid)',
    required: true,
    type: UUID,
  })
  userId: string;

  @ApiProperty({
    name: 'tittle',
    description: 'note tittle',
    required: true,
    type: String,
  })
  tittle: string;

  @ApiProperty({
    name: 'content',
    description: 'note text content',
    required: true,
    type: String,
  })
  content: string;

  @ApiProperty({
    name: 'createdAt',
    description: 'date of creation',
    required: true,
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    name: 'updatedAt',
    description: 'date of last note modification',
    required: true,
    type: Date,
  })
  updatedAt: Date;

  @ApiProperty({
    name: 'isFavorite',
    description: 'is it a favorite note?',
    required: true,
    type: Boolean,
  })
  isFavorite: boolean;

  constructor(note: Notes, isFavorite: boolean) {
    const { id, userId, tittle, content, createdAt, updatedAt } = note;

    this.id = id;
    this.userId = userId;
    this.tittle = tittle;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isFavorite = isFavorite;
  }

  static create(note: Notes, isFavorite: boolean) {
    return new NoteAndFavoritesResponseDto(note, isFavorite);
  }
}
