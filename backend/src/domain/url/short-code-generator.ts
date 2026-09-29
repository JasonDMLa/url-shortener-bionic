import { randomInt } from 'node:crypto';
import type {
  CodeGenerator,
  CodeTakenCheck,
} from '../../types/url/short-code-generator.types.js';

const BASE36_ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789';
const CODE_LENGTH = 6;
const MAX_ATTEMPTS = 3;

export function generateShortCode(): string {
  let code = '';
  for (let i = 0; i < CODE_LENGTH; i++) {
    code += BASE36_ALPHABET[randomInt(BASE36_ALPHABET.length)];
  }
  return code;
}

export function findUnusedCode(
  generate: CodeGenerator,
  isTaken: CodeTakenCheck,
): string {
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const code = generate();
    if (!isTaken(code)) {
      return code;
    }
  }
  throw new Error(`No unused short code found after ${MAX_ATTEMPTS} attempts`);
}
