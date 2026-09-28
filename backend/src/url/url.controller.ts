import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { UrlService } from './url.service.js';
import { CreateShortenedUrlDto } from '../dto/url/create-shortened-url.dto.js';
import { ShortenedUrlResponseDto } from '../dto/url/shortened-url-response.dto.js';
import { RedirectResponseDto } from '../dto/url/redirect-response.dto.js';
import type { Response } from 'express';


@Controller('')
export class UrlController {
  constructor(private urlService: UrlService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  shorten(@Body() body: CreateShortenedUrlDto): ShortenedUrlResponseDto {
    const result = this.urlService.shorten(body.url);
    return { short_url: `/${result.shortCode}`, url: result.url };
  }

  @Get(':shortCode')
  redirect(
    @Param('shortCode') shortCode: string,
    @Res({ passthrough: true }) res: Response,
  ): RedirectResponseDto {
    const url = this.urlService.resolve(shortCode);
    res.status(HttpStatus.MOVED_PERMANENTLY).location(url);
    return { url };
  }
}
