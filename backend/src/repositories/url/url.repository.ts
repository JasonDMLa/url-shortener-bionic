import { Injectable } from '@nestjs/common';

@Injectable()
export class UrlRepository {
  private readonly urls = new Map<string, string>();

  exists(shortCode: string): boolean {
    return this.urls.has(shortCode);
  }

  findUrl(shortCode: string): string | undefined {
    return this.urls.get(shortCode);
  }

  findShortCode(url: string): string | undefined {
    for (const shortCode of this.urls.keys()) {
      if (this.urls.get(shortCode) === url) {
        return shortCode;
      }
    }
    return undefined;
  }

  save(shortCode: string, url: string): void {
    this.urls.set(shortCode, url);
  }
}
