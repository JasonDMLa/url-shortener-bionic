import { Injectable, NotFoundException } from '@nestjs/common';
import { ShortenResult } from '../types/url/shorten-result.types.js';
import { UrlRepository } from '../repositories/url/url.repository.js';
import {
  findUnusedCode,
  generateShortCode,
} from '../domain/url/short-code-generator.js';

@Injectable()
export class UrlService {
  constructor(private readonly urlRepository: UrlRepository) {}

  shorten(url: string): ShortenResult {
    const existingShortCode = this.urlRepository.findShortCode(url);
    if (existingShortCode) {
      return { shortCode: existingShortCode, url };
    }

    const checkExistsInRepo = (code: string) => this.urlRepository.exists(code);
    const shortCode = findUnusedCode(generateShortCode, checkExistsInRepo);

    this.urlRepository.save(shortCode, url);

    return { shortCode, url };
  }

  resolve(shortCode: string): string {
    const url = this.urlRepository.findUrl(shortCode);
    if (!url) {
      throw new NotFoundException(`No URL found for short code /${shortCode}`);
    }
    return url;
  }
  
}
