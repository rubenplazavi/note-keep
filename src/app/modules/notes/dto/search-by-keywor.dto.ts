import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SearchByKeywordDto {
  @ApiProperty({
    name: 'keyword',
    description: 'keyword to search by',
    required: true,
    type: String,
  })
  @IsString()
  keyword: string;

  constructor(keyword: string) {
    this.keyword = keyword;
  }

  static create(keyword: string) {
    return new SearchByKeywordDto(keyword);
  }
}
