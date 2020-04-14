import { normaliseDurationToDays } from '../index';

test('should normalise days as days', () => {
  const value = normaliseDurationToDays('days', 58);
  expect(value).toBe(58);
});

test('should normalise weeks to days', () => {
  const value = normaliseDurationToDays('weeks', 10);
  expect(value).toBe(70);
});

test('should normalise months to days', () => {
  const value = normaliseDurationToDays('months', 4);
  expect(value).toBe(120);
});
