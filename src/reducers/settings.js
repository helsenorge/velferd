import {
  SET_FHIR_URL, SET_AUTHENTICATE,
} from '../actions/settings';


export function settings(state = {
  authenticate: false,
  fhirUrl: 'http://continua.cloudapp.net/baseDstu2',
  questionnaireId: '62763',
}, action) {
  switch (action.type) {
  case SET_FHIR_URL:
    return Object.assign({}, state, {
      fhirUrl: action.url,
    });
  case SET_AUTHENTICATE:
    return Object.assign({}, state, {
      authenticate: action.authenticate,
    });
  default:
    return state;
  }
}
