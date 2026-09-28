import { IsUrl } from 'class-validator';

export class CreateShortenedUrlDto {
  @IsUrl(
    { protocols: ['http', 'https'], require_protocol: true },
    { message: 'url must be a valid URL starting with http:// or https://' },
  )
  url: string;
}
