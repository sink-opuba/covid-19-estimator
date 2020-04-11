import {
  normaliseDurationToDays,
  estimateCurrentlyInfected,
  estimateInfectionsByRequestedTime,
  estimateSevereCasesByRequestedTime,
  estimateHospitalBedsByRequestedTime,
  estimateCasesForICUByRequestedTime,
  estimateCasesForVentilatorsByRequestedTime,
  estimateDollarsInFlight
} from './helpers';

const covid19ImpactEstimator = (data) => {
  const input = data;
  const {
    reportedCases,
    periodType,
    timeToElapse,
    totalHospitalBeds,
    region: { avgDailyIncomeInUSD, avgDailyIncomePopulation }
  } = input;

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

  const casesForICUByRequestedTime = estimateCasesForICUByRequestedTime(
    infectionsByRequestedTime
  );

  const casesForVentilatorsByRequestedTime = estimateCasesForVentilatorsByRequestedTime(
    infectionsByRequestedTime
  );

  const dollarsInFlight = estimateDollarsInFlight(
    infectionsByRequestedTime,
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation,
    duration
  );

  return {
    data,
    impact: {
      currentlyInfected: currentlyInfected.impact,
      infectionsByRequestedTime: infectionsByRequestedTime.impact,
      severeCasesByRequestedTime: severeCasesByRequestedTime.impact,
      hospitalBedsByRequestedTime: hospitalBedsByRequestedTime.impact,
      casesForICUByRequestedTime: casesForICUByRequestedTime.impact,
      casesForVentilatorsByRequestedTime:
        casesForVentilatorsByRequestedTime.impact,
      dollarsInFlight: dollarsInFlight.impact
    },
    severeImpact: {
      currentlyInfected: currentlyInfected.severe,
      infectionsByRequestedTime: infectionsByRequestedTime.severe,
      severeCasesByRequestedTime: severeCasesByRequestedTime.severe,
      hospitalBedsByRequestedTime: hospitalBedsByRequestedTime.severe,
      casesForICUByRequestedTime: casesForICUByRequestedTime.severe,
      casesForVentilatorsByRequestedTime:
        casesForVentilatorsByRequestedTime.severe,
      dollarsInFlight: dollarsInFlight.severe
    }
  };
};
export default covid19ImpactEstimator;
