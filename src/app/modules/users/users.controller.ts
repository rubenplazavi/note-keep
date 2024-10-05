import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserService } from './services/create-user.service';
import { FindUserService } from './services/find-users.service';
import { DeleteUserService } from './services/delete-user.service';
import { UpdateUserService } from './services/update-user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDecorator } from './decorators/create-user.decorator';
import { GetUserDecorator } from './decorators/get-user.decorator';
import { DeleteUserDecorator } from './decorators/delete-user.decorator';
import { GetAllUsersDecorator } from './decorators/get-all-users.decorator';
import { UpdateUserDecorator } from './decorators/update-user.decorator';
import { AuthGenericOwnerGuard } from '../common/guards/auth-generic-owner.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly findUserService: FindUserService,
    private readonly deleteUserService: DeleteUserService,
    private readonly updateUserService: UpdateUserService,
  ) {}

  @Post()
  @CreateUserDecorator()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserService.create(createUserDto);
  }

  @Get()
  @GetAllUsersDecorator()
  findAll() {
    return this.findUserService.findAll();
  }

  @Get(':id')
  @GetUserDecorator()
  @AuthGenericOwnerGuard()
  findUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.findUserService.findById(id);
  }

  @Delete(':id')
  @DeleteUserDecorator()
  @AuthGenericOwnerGuard()
  deleteById(@Param('id', ParseUUIDPipe) id: string) {
    return this.deleteUserService.deleteById(id);
  }

  @Patch(':id')
  @UpdateUserDecorator()
  @AuthGenericOwnerGuard()
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.updateUserService.update(updateUserDto);
  }
}
