import {
  REQUEST_QUESTIONNAIRE_RESPONSES,
  REQUEST_NEXT_QUESTIONNAIRE_RESPONSES,
  RECEIVE_QUESTIONNAIRE_RESPONSES,
  RECEIVE_QUESTIONNAIRE_RESPONSES_FAILED,
} from '../actions/questionnaire-responses';
import { RESET_PATIENT_DATA } from '../actions/patient';

export function questionnaireResponses(state = {
  isFetching: false,
  data: [],
  error: null,
  from: null,
  to: null,
}, action) {
  switch (action.type) {
  case RESET_PATIENT_DATA:
    return Object.assign({}, state, {
      isFetching: false,
      data: [],
      error: null,
      from: null,
      to: null,
    });
  case REQUEST_QUESTIONNAIRE_RESPONSES:
    return Object.assign({}, state, {
      isFetching: true,
      from: action.from,
      to: action.to,
      error: null,
    });
  case REQUEST_NEXT_QUESTIONNAIRE_RESPONSES:
    return Object.assign({}, state, {
      isFetching: true,
    });
  case RECEIVE_QUESTIONNAIRE_RESPONSES: {
    const actionData = action.data.entry ? action.data.entry : [];
    const data = [...state.data, ...actionData];
    return Object.assign({}, state, {
      isFetching: false,
      data,
      lastUpdated: action.receivedAt,
    });
  }
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
