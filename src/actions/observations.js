import fetch from 'isomorphic-fetch';

export const REQUEST_OBSERVATIONS = 'REQUEST_OBSERVATIONS';
export const RECEIVE_OBSERVATIONS = 'RECEIVE_OBSERVATIONS';

function requestObservations(code, patientId) {
  return {
    type: REQUEST_OBSERVATIONS,
    code,
    patientId,
  };
}

function receiveObservations(code, patientId, json) {
  return {
    type: RECEIVE_OBSERVATIONS,
    code,
    patientId,
    data: json,
    receivedAt: Date.now(),
  };
}

function useMock() {
  return process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'mock';
}

export function fetchObservations(fhirUrl, code, patientId) {
  if (useMock()) {
    const json = require( `../mock/${code}.observations.json`); // eslint-disable-line
    return dispatch => dispatch(receiveObservations(code, patientId, json));
  }

  return dispatch => {
    dispatch(requestObservations(code, patientId));
    const url =
    `${fhirUrl}/Observation?_count=500&_sort:asc=date&code=${code}&patient=${patientId}`;
    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receiveObservations(code, patientId, json)));
  };
}
