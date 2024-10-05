import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { CreateUserService } from '../users/services/create-user.service';
import { DeleteAllUserService } from '../users/services/delete-all-users.service';
import { usersToInsert } from './data/users-data';

@Injectable()
export class SeedService {
  constructor(
    private createUserService: CreateUserService,
    private deleteAllUserService: DeleteAllUserService,
  ) {}

  async executeSeed() {
    const { affected } = await this.deleteAllUserService.deleteAll();

    this.insertUsers();

    return {
      rawsDeletedAffected: affected,
    };
  }

  async insertUsers() {
    for (const user of usersToInsert) {
      try {
        this.createUserService.create(user);
      } catch (error) {
        throw new InternalServerErrorException(error);
      }
    }
  }
}
