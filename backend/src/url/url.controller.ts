import { Controller, Post, Body } from '@nestjs/common';
import { UrlService } from './url.service.js';
import { CreateShortenedUrlDto } from '../dto/url/create-shortened-url.dto.js';

@Controller('')
export class UrlController {
  constructor(private urlService: UrlService) {}
  
  @Post()
  shorten(@Body() body: CreateShortenedUrlDto): string {
    return this.urlService.shorten(body.url);
  }
}
