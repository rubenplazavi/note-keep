import { IsString } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  tittle: string;

  @IsString()
  content: string;
}
