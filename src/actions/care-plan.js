import fetch from 'isomorphic-fetch';

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
    const json = require( `../mock/careplan.json`); // eslint-disable-line
    return dispatch => dispatch(receiveCarePlan(patientId, json));
  }

  return dispatch => {
    dispatch(requestCarePlan(patientId));
    const url =
    `${fhirUrl}/CarePlan?subject=${patientId}`;
    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receiveCarePlan(patientId, json)));
  };
}
