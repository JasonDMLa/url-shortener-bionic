import { generateShortCode } from '../../src/domain/url/short-code-generator.js';

describe('generateShortCode', () => {
  it('returns 6 characters from a-z and 0-9', () => {
    expect(generateShortCode()).toMatch(/^[a-z0-9]{6}$/);
  });
});
