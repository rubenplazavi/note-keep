import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateUserService } from './services/create-user.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { UpdateUserService } from './services/update-user.service';
import { UsersRepository } from './persistency/typeORM/UsersRepository';
import { FindUserService } from './services/find-users.service';
import { DeleteAllUserService } from './services/delete-all-users.service';
import { DeleteUserService } from './services/delete-user.service';
import { SendgridService } from './mailers/sengrid-user-welcome.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Notes } from '../notes/entities/notes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Notes]), ConfigModule],
  controllers: [UsersController],
  providers: [
    CreateUserService,
    UpdateUserService,
    FindUserService,
    UsersRepository,
    DeleteAllUserService,
    DeleteUserService,
    UpdateUserService,
    SendgridService,
    ConfigService,
  ],
  exports: [
    CreateUserService,
    UpdateUserService,
    UsersRepository,
    FindUserService,
    DeleteUserService,
  ],
})
export class UsersModule {}
