import { get } from '../helpers/api';
import { discardAuthToken } from '../actions/auth';

export const REQUEST_CAREPLAN = 'REQUEST_CAREPLAN';
export const RECEIVE_CAREPLAN = 'RECEIVE_CAREPLAN';

function requestCarePlan(patientId) {
  return {
    type: REQUEST_CAREPLAN,
    patientId,
  };
}

function receiveCarePlan(patientId, json) {
  return {
    type: RECEIVE_CAREPLAN,
    patientId,
    data: json,
    receivedAt: Date.now(),
  };
}

function useMock() {
  return process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'mock';
}

export function fetchCarePlan(fhirUrl, patientId) {
  if (useMock()) {
    const json = require( `../mock/care-plan.json`); // eslint-disable-line
    return dispatch => dispatch(receiveCarePlan(patientId, json));
  }

  return (dispatch, getState) => {
    const { token, expiration } = getState().auth;
    const { authenticate } = getState().settings;

    if (authenticate && (!token || new Date().valueOf() > expiration.valueOf())) {
      return dispatch(discardAuthToken());
    }

    dispatch(requestCarePlan(patientId));
    const url =
    `${fhirUrl}/CarePlan?subject=${patientId}`;
    return get(url, token)
      .then(response => response.json())
      .then(json => dispatch(receiveCarePlan(patientId, json)));
  };
}
