import {
  REQUEST_QUESTIONNAIRE_RESPONSES, RECEIVE_QUESTIONNAIRE_RESPONSES,
} from '../actions/questionnaire-responses';
import { RESET_PATIENT_DATA } from '../actions/patient';

export function questionnaireResponses(state = {
  isFetching: false,
  data: null,
}, action) {
  switch (action.type) {
  case RESET_PATIENT_DATA:
    return Object.assign({}, state, {
      isFetching: false,
      data: null,
    });
  case REQUEST_QUESTIONNAIRE_RESPONSES:
    return Object.assign({}, state, {
      isFetching: true,
      data: null,
    });
  case RECEIVE_QUESTIONNAIRE_RESPONSES:
    return Object.assign({}, state, {
      isFetching: false,
      data: action.data,
      lastUpdated: action.receivedAt,
    });
  default:
    return state;
  }
}
