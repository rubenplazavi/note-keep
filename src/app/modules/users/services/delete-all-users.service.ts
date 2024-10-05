import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../persistency/typeORM/UsersRepository';
import { DeleteResult } from 'typeorm';

@Injectable()
export class DeleteAllUserService {
  constructor(private userRepository: UsersRepository) {}
  async deleteAll(): Promise<DeleteResult> {
    return await this.userRepository.deleteAll();
  }
}
