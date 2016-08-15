
export default class Api {
  constructor(fhirUrl) {
    this.fhirUrl = fhirUrl;
  }

  fetchWeight(patientId) {
    const weightCode = '188736';
    return this.fetchObservation(patientId, weightCode);
  }

  fetchPulse(patientId) {
    const pulseCode = '149530';
    return this.fetchObservation(patientId, pulseCode);
  }

  fetchOximeter(patientId) {
    const oximeterCode = '150456';
    return this.fetchObservation(patientId, oximeterCode);
  }

  fetchObservation(patientId, code) {
    return fetch(
      `${this.fhirUrl}/Observation?_count=500&_sort:desc=date&code=${code}&patient=${patientId}`)
      .then(response => response.json())
      .then(json => console.log(json));
  }
}
