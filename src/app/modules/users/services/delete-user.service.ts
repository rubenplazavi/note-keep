import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UsersRepository } from '../persistency/typeORM/UsersRepository';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DeleteResult } from 'typeorm';

@Injectable()
export class DeleteUserService {
  constructor(
    private userRepository: UsersRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  async deleteById(id: string): Promise<DeleteResult> {
    try {
      this.eventEmitter.emit('user.deleted', id);
      return await this.userRepository.deleteById(id);
    } catch (error) {
      throw new InternalServerErrorException(
        'Is not you, is us, something went wrong',
      );
    }
  }
}
