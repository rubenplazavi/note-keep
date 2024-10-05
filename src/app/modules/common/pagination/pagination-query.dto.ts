import { IsIn, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class PaginationQueryDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  limit?: number = 10;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  page?: number = 1;

  @IsOptional()
  @IsIn(['createdAt', 'updatedAt', 'id', 'userId'])
  sortField?: string;
  
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC';
}
