import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { UsersModule } from '../users/users.module';
import { CreateUserService } from '../users/services/create-user.service';
import { DeleteAllUserService } from '../users/services/delete-all-users.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SendgridService } from '../users/mailers/sengrid-user-welcome.service';

@Module({
  imports: [UsersModule, ConfigModule],
  controllers: [SeedController],
  providers: [
    SeedService,
    CreateUserService,
    DeleteAllUserService,
    ConfigService,
    SendgridService,
  ],
})
export class SeedModule {}
