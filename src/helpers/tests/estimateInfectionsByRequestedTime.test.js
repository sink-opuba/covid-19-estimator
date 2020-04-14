import { estimateInfectionsByRequestedTime } from '../index';

const currentlyInfected = {
  impact: 100,
  severe: 500
};
const duration = 28;

test('should estimate infection by requested time for impact', () => {
  const infectionsByRequestedTime = estimateInfectionsByRequestedTime(
    currentlyInfected,
    duration
  );
  expect(infectionsByRequestedTime.impact).toBe(51200);
});

test('should estimate infection by requested time for severe impact', () => {
  const infectionsByRequestedTime = estimateInfectionsByRequestedTime(
    currentlyInfected,
    duration
  );
  expect(infectionsByRequestedTime.severe).toBe(256000);
});
