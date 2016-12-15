import {
  REQUEST_QUESTIONNAIRE_RESPONSES,
  RECEIVE_QUESTIONNAIRE_RESPONSES,
  RECEIVE_QUESTIONNAIRE_RESPONSES_FAILED,
} from '../actions/questionnaire-responses';
import { RESET_PATIENT_DATA } from '../actions/patient';

export function questionnaireResponses(state = {
  isFetching: false,
  data: null,
  error: null,
}, action) {
  switch (action.type) {
  case RESET_PATIENT_DATA:
    return Object.assign({}, state, {
      isFetching: false,
      data: null,
      error: null,
    });
  case REQUEST_QUESTIONNAIRE_RESPONSES:
    return Object.assign({}, state, {
      isFetching: true,
      data: null,
      error: null,
    });
  case RECEIVE_QUESTIONNAIRE_RESPONSES:
    return Object.assign({}, state, {
      isFetching: false,
      data: action.data,
      lastUpdated: action.receivedAt,
    });
  case RECEIVE_QUESTIONNAIRE_RESPONSES_FAILED:
    console.log('ERROR', action.error);
    return Object.assign({}, state, {
      isFetching: false,
      error: action.error,
    });
  default:
    return state;
  }
}
