import { IsString, IsDate, IsNotEmpty } from 'class-validator';

export class NewsDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsDate()
  createdAt: Date;
}