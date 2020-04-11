export const normaliseDurationToDays = (periodType, timeToElapse) => {
  const time = parseInt(timeToElapse);
  if (periodType === 'days') {
    return time;
  }
  if (periodType === 'weeks') {
    return time * 7;
  }
  if (periodType === 'months') {
    return time * 30;
  }
};

export const estimateCurrentlyInfected = (reportedCases) => ({
  impact: reportedCases * 10,
  severe: reportedCases * 50
});

export const estimateInfectionsByRequestedTime = (
  currentlyInfected,
  duration
) => {
  // To estimate the number of infected people e.g 28days (duration) days from now
  // note that currentlyInfected doubles every 3 days, so you'd have to multiply it by a factor of 2
  const factor = Math.trunc(duration / 3); // discarding decimal portion only integer is used
  const impact = currentlyInfected.impact * 2 ** factor;
  const severe = currentlyInfected.severe * 2 ** factor;
  return {
    impact,
    severe
  };
};

export const estimateSevereCasesByRequestedTime = (
  infectionsByRequestedTime
) => {
  // number of severe positive cases that will require hospitalization to recover
  // 15 % of infectionsByRequestedTime

  const impact = Math.trunc(infectionsByRequestedTime.impact * 0.15);
  const severe = Math.trunc(infectionsByRequestedTime.severe * 0.15);
  return {
    impact,
    severe
  };
};

// determine the number of available beds
export const estimateHospitalBedsByRequestedTime = (
  totalHospitalBeds,
  severeCasesByRequestedTime
) => {
  // On average, 65% of hospital beds are already occupied by patients
  //  and many hospitals usually are at 90% or 95% capacity
  // we expect only a 35% bed availability in hospitals for severe COVID-19 positive patients
  const availabilityBeds = Math.trunc(0.35 * totalHospitalBeds);
  const impact = availabilityBeds - severeCasesByRequestedTime.impact;
  const severe = availabilityBeds - severeCasesByRequestedTime.severe;
  return {
    impact,
    severe
  };
};

// estimated number of severe positive cases that will require ICU care
export const estimateCasesForICUByRequestedTime = (
  infectionsByRequestedTime
) => {
  // 5% of infectionsByRequestedTime
  const impact = Math.trunc(0.05 * infectionsByRequestedTime.impact);
  const severe = Math.trunc(0.05 * infectionsByRequestedTime.severe);

  return {
    impact,
    severe
  };
};

// estimated number of severe positive cases that will require ventilators
export const estimateCasesForVentilatorsByRequestedTime = (
  infectionsByRequestedTime
) => {
  // 2% of infectionsByRequestedTime
  const impact = Math.trunc(0.02 * infectionsByRequestedTime.impact);
  const severe = Math.trunc(0.02 * infectionsByRequestedTime.severe);

  return {
    impact,
    severe
  };
};

// estimate how much money the economy is likely to lose daily, over the said period of time
export const estimateDollarsInFlight = (
  infectionsByRequestedTime,
  avgDailyIncomeInUSD,
  avgDailyIncomePopulation,
  duration
) => {
  // (infectionsByRequestedTime x 0.65 x 1.5) / 30
  const impact = Math.trunc(
    (infectionsByRequestedTime.impact
      * avgDailyIncomePopulation
      * avgDailyIncomeInUSD)
      / duration
  );
  const severe = Math.trunc(
    (infectionsByRequestedTime.severe
      * avgDailyIncomePopulation
      * avgDailyIncomeInUSD)
      / duration
  );

  return {
    impact,
    severe
  };
};
