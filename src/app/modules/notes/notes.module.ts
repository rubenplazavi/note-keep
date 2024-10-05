import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NotesController } from './notes.controller';
import { Notes } from './entities/notes.entity';
import { NotesRepository } from './persistency/typeORM/notesRepository';
import { UpdateNoteService } from './services/update-note.service';
import { CreateNoteService } from './services/create-note.service';
import { FindNoteService } from './services/find-notes.service';
import { DeleteNoteService } from './services/delete-note.service';
import { UsersRepository } from '../users/persistency/typeORM/UsersRepository';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notes, User])],
  controllers: [NotesController],
  providers: [
    UpdateNoteService,
    CreateNoteService,
    FindNoteService,
    NotesRepository,
    DeleteNoteService,
    UsersRepository,
  ],
})
export class NotesModule {}
