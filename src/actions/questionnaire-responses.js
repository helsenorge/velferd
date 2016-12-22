import { get } from '../helpers/api';
import { discardAuthToken } from '../actions/auth';
import { formatDate3 } from '../helpers/date-helpers';

export const REQUEST_NEXT_QUESTIONNAIRE_RESPONSES = 'REQUEST_NEXT_QUESTIONNAIRE_RESPONSES';
export const REQUEST_QUESTIONNAIRE_RESPONSES = 'REQUEST_QUESTIONNAIRE_RESPONSES';
export const RECEIVE_QUESTIONNAIRE_RESPONSES = 'RECEIVE_QUESTIONNAIRE_RESPONSES';
export const RECEIVE_QUESTIONNAIRE_RESPONSES_FAILED = 'RECEIVE_QUESTIONNAIRE_RESPONSES_FAILED';

function requestNextQuestionnaireResponses(patientId) {
  return {
    type: REQUEST_NEXT_QUESTIONNAIRE_RESPONSES,
    patientId,
  };
}

function requestQuestionnaireResponses(patientId, from, to) {
  return {
    type: REQUEST_QUESTIONNAIRE_RESPONSES,
    patientId,
    from,
    to,
  };
}

function receiveQuestionnaireResponses(patientId, json) {
  return {
    type: RECEIVE_QUESTIONNAIRE_RESPONSES,
    patientId,
    data: json,
    receivedAt: Date.now(),
  };
}

function receiveQuestionnaireResponsesFailed(patientId, error) {
  return {
    type: RECEIVE_QUESTIONNAIRE_RESPONSES_FAILED,
    patientId,
    error,
  };
}

export function fetchNextQuestionnaireResponses(patientId, url) {
  return (dispatch, getState) => {
    const { token, expiration, useXAuthTokenHeader } = getState().auth;
    const { authenticate } = getState().settings;

    if (authenticate && (!token || (expiration && new Date().valueOf() > expiration.valueOf()))) {
      return dispatch(discardAuthToken());
    }

    dispatch(requestNextQuestionnaireResponses(patientId));

    return get(url, token, useXAuthTokenHeader)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveQuestionnaireResponses(patientId, json));

        if (json.link) {
          const nextLink = json.link.filter(link => link.relation === 'next');
          if (nextLink && nextLink.length > 0) {
            const nextURL = nextLink[0].url;
            dispatch(fetchNextQuestionnaireResponses(patientId, nextURL));
          }
        }
      },
      error => dispatch(receiveQuestionnaireResponsesFailed(patientId, error)));
  };
}

function fetchNexPageIfNeeded(data, dispatch, patientId) {
  if (data.link) {
    const nextLink = data.link.filter(link => link.relation === 'next');
    if (nextLink && nextLink.length > 0) {
      const nextURL = nextLink[0].url;
      dispatch(fetchNextQuestionnaireResponses(patientId, nextURL));
    }
  }
}

export function fetchQuestionnaireResponses(from, to, patientId) {
  return (dispatch, getState) => {
    const { token, expiration, useXAuthTokenHeader } = getState().auth;
    const { authenticate, fhirUrl } = getState().settings;

    if (authenticate && (!token || (expiration && new Date().valueOf() > expiration.valueOf()))) {
      return dispatch(discardAuthToken());
    }

    const responses = getState().questionnaireResponses;
    if (responses.from && from.getTime() >= new Date(responses.from).getTime()) {
      return null;
    }

    // request data starting 7 days before the start date shown
    const requestFrom = new Date(from.getTime());
    requestFrom.setDate(requestFrom.getDate() - 7);

    let requestTo = to;
    if (responses.from) {
      requestTo = new Date(responses.from);
      requestTo.setDate(requestTo.getDate() - 1);
    }

    const url = `${fhirUrl}/QuestionnaireResponse?_sort:desc=authored&patient=${patientId}
      &authored=>=${formatDate3(requestFrom)}&authored=<=${formatDate3(requestTo)}`;

    dispatch(requestQuestionnaireResponses(
      patientId,
      requestFrom.toJSON(),
      responses.to ? responses.to : to.toJSON())
    );

    return get(url, token, useXAuthTokenHeader)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveQuestionnaireResponses(patientId, json));
        fetchNexPageIfNeeded(json, dispatch, patientId);
      },
      error => dispatch(receiveQuestionnaireResponsesFailed(patientId, error)));
  };
}
