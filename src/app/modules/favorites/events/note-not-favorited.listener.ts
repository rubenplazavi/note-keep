import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NoteFavoritedEvent } from './note-favorited.event';

@Injectable()
export class NoteNotFavoritedListener {
  private readonly logger = new Logger(NoteNotFavoritedListener.name);

  @OnEvent('note.notFavorited')
  handleNoteFavoritedEvent(event: NoteFavoritedEvent) {
    this.logger.log(`Note: ${event.noteId} remove from Favorites!!`);
  }
}
