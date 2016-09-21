import ObservationCodes from '../constants/observation-codes';

export function getMeasurementName(code) {
  switch (code) {
  case ObservationCodes.weight:
    return 'Vekt';
  case ObservationCodes.pulse:
    return 'Puls';
  case ObservationCodes.pulseOximeter:
    return 'Puls oksymeter';
  case ObservationCodes.bloodPressure:
    return 'Blodtrykk';
  default:
    return '';
  }
}

export function getUnit(code) {
  switch (code) {
  case ObservationCodes.weight:
    return 'kg';
  case ObservationCodes.pulse:
    return 'bpm';
  case ObservationCodes.pulseOximeter:
    return '%';
  case ObservationCodes.bloodPressure:
    return 'mm Hg';
  default:
    return null;
  }
}
