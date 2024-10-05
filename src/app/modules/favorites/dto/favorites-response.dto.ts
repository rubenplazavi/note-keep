import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

export class FavoritesResponseDto {
  @ApiProperty({
    name: 'id',
    description: 'note id',
    type: String,
  })
  id: UUID;

  @ApiProperty({
    name: 'userId',
    description: 'user id, notes owner',
    type: UUID,
  })
  userId: string;

  @ApiProperty({
    name: 'tittle',
    description: 'tittle of the note',
    type: String,
  })
  tittle: string;

  @ApiProperty({
    name: 'content',
    description: 'text of the note, content',
    type: String,
  })
  content: string;

  @ApiProperty({
    name: 'createdAt',
    description: 'Date when the note was created',
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    name: 'updatedAt',
    description: 'Date when the note was updated',
    type: Date,
  })
  updatedAt: Date;
}
