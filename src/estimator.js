import {
  normaliseDurationToDays,
  estimateCurrentlyInfected,
  estimateInfectionsByRequestedTime,
  estimateSevereCasesByRequestedTime,
  estimateHospitalBedsByRequestedTime
} from './helpers';

const covid19ImpactEstimator = (data) => {
  const input = data;
  const { reportedCases, periodType, timeToElapse, totalHospitalBeds } = input;
  const currentlyInfected = estimateCurrentlyInfected(reportedCases);

  const duration = normaliseDurationToDays(periodType, timeToElapse);

  const infectionsByRequestedTime = estimateInfectionsByRequestedTime(
    currentlyInfected,
    duration
  );

  const severeCasesByRequestedTime = estimateSevereCasesByRequestedTime(
    infectionsByRequestedTime
  );

  const hospitalBedsByRequestedTime = estimateHospitalBedsByRequestedTime(
    totalHospitalBeds,
    severeCasesByRequestedTime
  );
  return {
    data,
    impact: {
      currentlyInfected: currentlyInfected.impact,
      infectionsByRequestedTime: infectionsByRequestedTime.impact,
      severeCasesByRequestedTime: severeCasesByRequestedTime.impact,
      hospitalBedsByRequestedTime: hospitalBedsByRequestedTime.impact
    },
    severeImpact: {
      currentlyInfected: currentlyInfected.severe,
      infectionsByRequestedTime: infectionsByRequestedTime.severe,
      severeCasesByRequestedTime: severeCasesByRequestedTime.severe,
      hospitalBedsByRequestedTime: hospitalBedsByRequestedTime.severe
    }
  };
};
export default covid19ImpactEstimator;
