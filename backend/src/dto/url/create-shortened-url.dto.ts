import { IsUrl } from 'class-validator';

export class CreateShortenedUrlDto {
@IsUrl()
  url: string;
}