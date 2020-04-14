import { estimateDollarsInFlight } from '../index';

const infectionsByRequestedTime = {
  impact: 100,
  severe: 500
};

const avgDailyIncomeInUSD = 1.5;
const avgDailyIncomePopulation = 0.65;
const duration = 30;

test('should estimate how much money the economy is likely to lose daily during impact', () => {
  const dollarsInFlight = estimateDollarsInFlight(
    infectionsByRequestedTime,
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation,
    duration
  );
  expect(dollarsInFlight.impact).toBe(3);
});

test('should estimate how much money the economy is likely to lose daily during severe impact', () => {
  const dollarsInFlight = estimateDollarsInFlight(
    infectionsByRequestedTime,
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation,
    duration
  );
  expect(dollarsInFlight.severe).toBe(16);
});
