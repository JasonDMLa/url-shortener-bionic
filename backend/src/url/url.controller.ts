import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { UrlService } from './url.service.js';
import { CreateShortenedUrlDto } from '../dto/url/create-shortened-url.dto.js';
import { ShortenedUrlResponseDto } from '../dto/url/shortened-url-response.dto.js';

@Controller('')
export class UrlController {
  constructor(private urlService: UrlService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  shorten(@Body() body: CreateShortenedUrlDto): ShortenedUrlResponseDto {
    const result = this.urlService.shorten(body.url);
    return { short_url: `/${result.shortCode}`, url: result.url };
  }
}
