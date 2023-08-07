import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class GetPaginatedFilesQueryDto {
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1)
  listSize = 10;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1)
  page = 1;
}

export class FileId {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1)
  id: number;
}
