import { estimateHospitalBedsByRequestedTime } from '../index';

const severeCasesByRequestedTime = {
  impact: 100,
  severe: 500
};
const totalHopitalBeds = 400;
const hospitalBedsByRequestedTime = estimateHospitalBedsByRequestedTime(
  totalHopitalBeds,
  severeCasesByRequestedTime
);

test('should compute available hospital beds by requested time', () => {
  expect(estimateHospitalBedsByRequestedTime).toBeDefined();
});

test('should estimate hospital beds by requested time for infected cases', () => {
  expect(hospitalBedsByRequestedTime.impact).toBe(40);
});

test('should estimate hospital beds by requested time for severe impact', () => {
  expect(hospitalBedsByRequestedTime.severe).toBe(-360);
});
