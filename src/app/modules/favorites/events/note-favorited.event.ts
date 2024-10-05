export class NoteFavoritedEvent {
  constructor(
    public readonly userId: string,
    public readonly noteId: string,
  ) {}
}
