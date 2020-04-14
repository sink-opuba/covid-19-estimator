import { estimateCasesForVentilatorsByRequestedTime } from '../index';

const infectionsByRequestedTime = {
  impact: 51000,
  severe: 250000
};
test('should estimate cases for ICU by requested time of impact', () => {
  const casesForVentilators = estimateCasesForVentilatorsByRequestedTime(
    infectionsByRequestedTime
  );
  expect(casesForVentilators.impact).toBe(1020);
});

test('should estimate cases for ICU by requested time of severe impact', () => {
  const casesForVentilators = estimateCasesForVentilatorsByRequestedTime(
    infectionsByRequestedTime
  );
  expect(casesForVentilators.severe).toBe(5000);
});
