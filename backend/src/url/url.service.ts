import { Injectable } from '@nestjs/common';
import { ShortenResult } from '../types/url/shorten-result.js';

@Injectable()
export class UrlService {
  shorten(url: string): ShortenResult {
    return { shortCode: 'abc123', url };
  }
}
