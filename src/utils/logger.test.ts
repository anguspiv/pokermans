import { getConsolaLevelStr } from './logger';

describe('getConsolaLevelStr', () => {
  it.each([
    ['Error', 'ERROR'],
    ['Error', 'error'],
    ['Error', 'Error'],
    ['Info', 'info'],
  ])('should return %s for %s', (expected, level) => {
    expect.assertions(1);

    const actual = getConsolaLevelStr(level);

    expect(actual).toBe(expected);
  });

  it('should through a invalid level error', () => {
    expect.assertions(1);

    const level = 'garbage';

    expect(() => {
      getConsolaLevelStr(level);
    }).toThrow(`Invalid Log Level: ${level}`);
  });
});
