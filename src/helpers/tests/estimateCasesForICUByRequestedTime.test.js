import { estimateCasesForICUByRequestedTime } from '../index';

const infectionsByRequestedTime = {
  impact: 51000,
  severe: 250000
};
test('should estimate cases for ICU by requested time of impact', () => {
  const casesForICU = estimateCasesForICUByRequestedTime(
    infectionsByRequestedTime
  );
  expect(casesForICU.impact).toBe(2550);
});

test('should estimate cases for ICU by requested time of severe impact', () => {
  const casesForICU = estimateCasesForICUByRequestedTime(
    infectionsByRequestedTime
  );
  expect(casesForICU.severe).toBe(12500);
});
