import { get } from '../helpers/api';
import { discardAuthToken } from '../actions/auth';

export const REQUEST_QUESTIONNAIRE_RESPONSES = 'REQUEST_QUESTIONNAIRE_RESPONSES';
export const RECEIVE_QUESTIONNAIRE_RESPONSES = 'RECEIVE_QUESTIONNAIRE_RESPONSES';

function requestQuestionnaireResponses(patientId) {
  return {
    type: REQUEST_QUESTIONNAIRE_RESPONSES,
    patientId,
  };
}

function receivetQuestionnaireResponses(patientId, json) {
  return {
    type: RECEIVE_QUESTIONNAIRE_RESPONSES,
    patientId,
    data: json,
    receivedAt: Date.now(),
  };
}

function useMock() {
  return process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'mock';
}

export function fetchQuestionnaireResponses(patientId) {
  if (useMock()) {
    const json = require( `../mock/questionnaire-responses.json`); // eslint-disable-line
    return dispatch => dispatch(receivetQuestionnaireResponses(patientId, json));
  }

  return (dispatch, getState) => {
    const { token, expiration } = getState().auth;
    const { authenticate, fhirUrl } = getState().settings;

    if (authenticate && (!token || new Date().valueOf() > expiration.valueOf())) {
      return dispatch(discardAuthToken());
    }

    dispatch(requestQuestionnaireResponses(patientId));
    const url =
    `${fhirUrl}/QuestionnaireResponse?_count=500&_sort:asc=authored&patient=${patientId}`;
    return get(url, token)
      .then(response => response.json())
      .then(json => dispatch(receivetQuestionnaireResponses(patientId, json)));
  };
}
