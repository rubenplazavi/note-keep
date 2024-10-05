import { IsString } from 'class-validator';

export class UpdateNoteDto {
  @IsString()
  tittle: string;

  @IsString()
  content: string;
}
