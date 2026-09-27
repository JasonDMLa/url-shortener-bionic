import { randomInt } from 'node:crypto';

const BASE36_ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789';
const CODE_LENGTH = 6;

export function generateShortCode(): string {
  let code = '';
  for (let i = 0; i < CODE_LENGTH; i++) {
    code += BASE36_ALPHABET[randomInt(BASE36_ALPHABET.length)];
  }
  return code;
}
