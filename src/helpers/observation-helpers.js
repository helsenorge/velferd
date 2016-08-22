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
