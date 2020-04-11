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

export const estimateCurrentlyInfected = (reportedCases) => {
  return {
    impact: reportedCases * 10,
    severe: reportedCases * 50
  };
};

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
