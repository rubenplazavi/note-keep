import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NoteFavoritedEvent } from './note-favorited.event';

@Injectable()
export class NoteFavoritedListener {
  private readonly logger = new Logger(NoteFavoritedListener.name);

  @OnEvent('note.favorited')
  handleNoteFavoritedEvent(event: NoteFavoritedEvent) {
    this.logger.log(
      `User ${event.userId} create a favorited note with id: ${event.noteId}`,
    );
  }
}
