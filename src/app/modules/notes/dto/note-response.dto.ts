import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

export class NoteResponseDto {
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
}
