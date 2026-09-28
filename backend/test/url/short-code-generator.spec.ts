import {
  findUnusedCode,
  generateShortCode,
} from '../../src/domain/url/short-code-generator.js';

const TAKEN_CODE = 'abc123';
const UNUSED_CODE = 'xyz789';

describe('generateShortCode', () => {
  it('returns 6 characters from a-z and 0-9', () => {
    expect(generateShortCode()).toMatch(/^[a-z0-9]{6}$/);
  });
});

describe('findUnusedCode', () => {
  it('returns the generated code when it is not taken', () => {
    const generate = () => UNUSED_CODE;
    const isTaken = () => false;

    expect(findUnusedCode(generate, isTaken)).toBe(UNUSED_CODE);
  });

  it('tries again when the generated code is taken', () => {
    const codes = [TAKEN_CODE, UNUSED_CODE];
    let call = 0;
    const generate = () => codes[call++];
    const isTaken = (code: string) => code === TAKEN_CODE;

    expect(findUnusedCode(generate, isTaken)).toBe(UNUSED_CODE);
  });

  it('throws after the maximum number of attempts', () => {
    let calls = 0;
    const generate = () => {
      calls++;
      return TAKEN_CODE;
    };
    const isTaken = () => true;

    expect(() => findUnusedCode(generate, isTaken)).toThrow();
    expect(calls).toBe(3);
  });
});
