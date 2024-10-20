import formatName from '../../src/utilities/UnitTestTest';

describe('Unit Test Test', () => {
  it('should format the name correctly', () => {
    const result: string = formatName('Alex', 'Ward');
    expect(result).toBe('Alex Ward');
  });
});