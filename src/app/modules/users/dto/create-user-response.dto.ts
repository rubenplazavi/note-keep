import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { User } from '../entities/user.entity';

export class CreateUserResponseDto {
  @ApiProperty({
    name: 'id',
    description: 'user id (uuid)',
    required: true,
    type: UUID,
  })
  id: string;

  @ApiProperty({
    name: 'username',
    description: 'user name',
    required: true,
    type: String,
  })
  username: string;

  @ApiProperty({
    name: 'email',
    description: 'users email',
    required: true,
    type: String,
  })
  email: string;

  @ApiProperty({
    name: 'profilePhotoUrl',
    description: 'photo of users profile',
    required: true,
    type: String,
  })
  profilePhotoUrl: string;

  @ApiProperty({
    name: 'createdAt',
    description: 'date of user sign up',
    required: true,
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    name: 'modifieddAt',
    description: 'date of last user detail modification',
    required: true,
    type: Date,
  })
  updatedAt: Date;

  constructor(
    id: string,
    username: string,
    email: string,
    profilePhotoUrl: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.profilePhotoUrl = profilePhotoUrl;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create(user: User) {
    const { id, username, email, profilePhotoUrl, createdAt, updatedAt } = user;

    return new CreateUserResponseDto(
      id,
      username,
      email,
      profilePhotoUrl,
      createdAt,
      updatedAt,
    );
  }
}
