
export function settings(state = {
  authenticate: false,
  fhirUrl: 'http://continua.cloudapp.net/baseDstu2',
  patientId: '1-26',
  questionnaireId: '62763',
}, action) {
  switch (action.type) {
  default:
    return state;
  }
}
