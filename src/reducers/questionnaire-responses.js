import {
  REQUEST_QUESTIONNAIRE_RESPONSES, RECEIVE_QUESTIONNAIRE_RESPONSES,
} from '../actions/questionnaire-responses';

export function questionnaireResponses(state = {
  isFetching: false,
  data: null,
}, action) {
  switch (action.type) {
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
