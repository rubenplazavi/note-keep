import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../persistency/typeORM/UsersRepository';
import { UserResponseDto } from '../dto/user-response.dto';
import { CreateUserResponseDto } from '../dto/create-user-response.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class FindUserService {
  constructor(private userRepository: UsersRepository) {}
  async findAll(): Promise<CreateUserResponseDto[]> {
    const users = await this.userRepository.find();

    const usersWithoutPassword = users.map((user) => {
      return CreateUserResponseDto.create(user);
    });
    return usersWithoutPassword;
  }
  //ToDo  ---->> SEPARAR RESPONSABILIDADES, UN SERVICIO POR CADA MÉTODO
  async findById(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findByID(id);

    const userWithoutPassword = UserResponseDto.create(
      user.id,
      user.username,
      user.email,
      user.profilePhotoUrl,
      user.createdAt,
      user.updatedAt,
    );
    return userWithoutPassword;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    return user;
  }
}
