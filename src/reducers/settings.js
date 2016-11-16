import {
  SET_FHIR_URL, SET_AUTHENTICATE,
} from '../actions/settings';


export function settings(state = {
  authenticate: true,
  fhirUrl: 'http://helsamitest.imatiscloud.com/Imatis/WebServices/External/FHIR/fhir',
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
