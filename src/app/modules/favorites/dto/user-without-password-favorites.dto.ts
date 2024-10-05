import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { Notes } from '../../notes/entities/notes.entity';

export class UserRequestWithFavoritesDto {
  @ApiProperty({
    name: 'id',
    description: 'users id',
    type: UUID,
  })
  id: string;

  @ApiProperty({
    name: 'username',
    description: 'users name',
    type: String,
  })
  username: string;

  @ApiProperty({
    name: 'email',
    description: 'users email',
    type: String,
  })
  email: string;

  @ApiProperty({
    name: 'profilePhotoUrl',
    description: 'url of the profile picture',
    type: String,
  })
  profilePhotoUrl: string;

  @ApiProperty({
    name: 'createdAt',
    description: 'date of sign up',
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    name: 'updatedAt',
    description: 'date of last update',
    type: Date,
  })
  updatedAt: Date;

  @ApiProperty({
    name: 'favoriteNotes',
    description: 'favorite notes from user',
    type: Array<Notes>,
  })
  favoriteNotes: Notes[];
}
