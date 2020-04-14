import { estimateCurrentlyInfected } from '../index';

const reportedCases = 10;

test('should calculate currently infected cases', () => {
  const currentlyInfected = estimateCurrentlyInfected(reportedCases);
  expect(currentlyInfected.impact).toBe(100);
});

test('should calculate currently infected cases severe impact', () => {
  const currentlyInfected = estimateCurrentlyInfected(reportedCases);
  expect(currentlyInfected.severe).toBe(500);
});
