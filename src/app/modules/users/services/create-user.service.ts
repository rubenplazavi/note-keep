import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { CreateUserDto } from '../dto/create-user.dto';
import { UsersRepository } from '../persistency/typeORM/UsersRepository';
import { v4 as uuid } from 'uuid';
import { CreateUserResponseDto } from '../dto/create-user-response.dto';
import { User } from '../entities/user.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class CreateUserService {
  constructor(
    private userRepository: UsersRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
    try {
      const { email, password, username } = createUserDto;
      const passwordHashed = User.makeHashedPassword(password);

      const url = `${process.env.HOST_API}/v1/files/user/default.jpeg`;
      const user = User.create(
        uuid(),
        username.toLowerCase(),
        email.toLowerCase(),
        url,
        passwordHashed,
      );

      const userCreated = await this.userRepository.create(user);

      this.eventEmitter.emit('user.created', userCreated);

      return CreateUserResponseDto.create(userCreated);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException('Error creating a user, try again');
    }

    throw new InternalServerErrorException('Please check server logs');
  }
}
