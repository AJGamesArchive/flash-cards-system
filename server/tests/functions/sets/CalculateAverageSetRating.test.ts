import calculateAverageSetRating from '../../../src/functions/sets/CalculateAverageSetRating';

describe('calculateAverageSetRating', () => {
  test('should return 0 for an empty array', () => {
    expect(calculateAverageSetRating([])).toBe(0);
  });

  test('should return the correct average for an array with one rating', () => {
    expect(calculateAverageSetRating([5])).toBe(5);
  });

  test('should return the correct average for an array with multiple ratings', () => {
    expect(calculateAverageSetRating([4, 5, 3, 4])).toBe(4);
  });

  test('should return the correct average for an array with all same ratings', () => {
    expect(calculateAverageSetRating([3, 3, 3, 3])).toBe(3);
  });

  test('should return the correct average for an array with decimal ratings', () => {
    expect(calculateAverageSetRating([4.5, 3.5, 4.0])).toBeCloseTo(4.0);
  });

  test('should handle large numbers correctly', () => {
    expect(calculateAverageSetRating([1000, 2000, 3000])).toBe(2000);
  });
});