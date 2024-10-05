import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersRepository } from '../persistency/typeORM/UsersRepository';
import { UpdateUserResponseDto } from '../dto/update-user-response.dto';
import { FindUserService } from './find-users.service';
import { User } from '../entities/user.entity';

@Injectable()
export class UpdateUserService {
  constructor(
    private userRepository: UsersRepository,
    private userFinder: FindUserService,
  ) {}

  async update(updateUserDto: UpdateUserDto): Promise<User> {
    const { email, username } = updateUserDto;
    const userExist = await this.userFinder.findByEmail(email);

    const user = UpdateUserResponseDto.create(
      userExist.id,
      username,
      email,
      userExist.profilePhotoUrl,
      userExist.createdAt,
    );

    return await this.userRepository.update(user);
  }
}
