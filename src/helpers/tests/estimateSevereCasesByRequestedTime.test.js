import { estimateSevereCasesByRequestedTime } from '../index';

const infectionsByRequestedTime = {
  impact: 100,
  severe: 500
};
test('Should estimate severe cases by requested time for impact', () => {
  const severeCasesByRequestedTime = estimateSevereCasesByRequestedTime(
    infectionsByRequestedTime
  );
  expect(severeCasesByRequestedTime.impact).toBe(15);
});

test('Should estimate severe cases by requested time for severe impact', () => {
  const severeCasesByRequestedTime = estimateSevereCasesByRequestedTime(
    infectionsByRequestedTime
  );

  expect(severeCasesByRequestedTime.severe).toBe(75);
});
