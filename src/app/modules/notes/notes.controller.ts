import {
  Controller,
  Post,
  Body,
  Patch,
  UseGuards,
  Param,
  Get,
  ParseUUIDPipe,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { CreateNoteService } from './services/create-note.service';
import { GetUser } from '../common/decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { UpdateNoteService } from './services/update-note.service';
import { FindNoteService } from './services/find-notes.service';
import { AuthNoteOwnerGuard } from './guards/auth-note-owner.guard';
import { DeleteNoteService } from './services/delete-note.service';
import { CreateNoteDecorator } from './decorators/create-note.decorator';
import { AuthGenericOwnerGuard } from '../common/guards/auth-generic-owner.guard';
import { GetAllUserNotesDecorator } from './decorators/get-all-user-notes.decorator';
import { GetNoteDecorator } from './decorators/get-note.decorator';
import { UpdateNoteDecorator } from './decorators/update-note.decorator';
import { DeleteNoteDecorator } from './decorators/delete-note.decorator';
import { ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from '../common/pagination/pagination-query.dto';
import { GetPaginatedNotesDecorator } from './decorators/get-paginated-notes.decorator';
import { SearchByKeywordDto } from './dto/search-by-keywor.dto';
import { SearchNotesByKeywordDecorator } from './decorators/search-notes-by-keyword.decorator';

@ApiTags('Notes')
@Controller('notes')
export class NotesController {
  constructor(
    private readonly createNoteService: CreateNoteService,
    private readonly updateNoteService: UpdateNoteService,
    private readonly findNoteService: FindNoteService,
    private readonly deleteNoteService: DeleteNoteService,
  ) {}

  @Post()
  @CreateNoteDecorator()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createNoteDto: CreateNoteDto, @GetUser() user: User) {
    return this.createNoteService.create(createNoteDto, user.id);
  }

  @Get('search-notes')
  @SearchNotesByKeywordDecorator()
  @UseGuards(AuthGuard('jwt'))
  findNotesByKeyword(@Query('keyword') keyword: string, @GetUser() user: User) {
    const key = SearchByKeywordDto.create(keyword);
    return this.findNoteService.findNotesByKeyword(key, user.id);
  }

  @Get(':id')
  @GetNoteDecorator()
  @AuthNoteOwnerGuard()
  findNote(@Param('id', ParseUUIDPipe) id: string) {
    return this.findNoteService.findById(id);
  }

  @Get('user/:id')
  @GetAllUserNotesDecorator()
  @AuthGenericOwnerGuard()
  findAllNotes(@Param('id', ParseUUIDPipe) id: string) {
    //todo borrar findNotesByUserId?????? mirar quien lo llama return this.findNoteService.findNotesByUserId(id);
    return this.findNoteService.findAllNotesForUser(id);
  }

  @Get('user/:id/paginated-notes')
  @GetPaginatedNotesDecorator()
  @AuthGenericOwnerGuard()
  findPaginatedNotes(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() pagination: PaginationQueryDto,
  ) {
    const { limit = 10, page = 1, sortField = 'createdAt', sortOrder = 'DESC' } = pagination;
    return this.findNoteService.findPaginatedNotesByUserId(id, { limit, page, sortField, sortOrder });
  }

  @Patch(':id')
  @UpdateNoteDecorator()
  @AuthNoteOwnerGuard()
  update(@Body() updateNoteDto: UpdateNoteDto, @Param('id') noteId: string) {
    return this.updateNoteService.update(updateNoteDto, noteId);
  }

  @Delete(':id')
  @DeleteNoteDecorator()
  @AuthNoteOwnerGuard()
  delete(@Param('id') id: string) {
    return this.deleteNoteService.delete(id);
  }
}
