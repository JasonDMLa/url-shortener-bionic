import { Injectable } from '@nestjs/common';

@Injectable()
export class UrlService {
  shorten(url: string): string {
    return url;
  }
}
