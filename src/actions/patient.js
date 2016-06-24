import fetch from 'isomorphic-fetch';

export const REQUEST_PATIENT = 'REQUEST_PATIENT';
export const RECEIVE_PATIENT = 'RECEIVE_PATIENT';

function requestPatient(patientId) {
  return {
    type: REQUEST_PATIENT,
    patientId,
  };
}

function receivePatient(patientId, json) {
  return {
    type: RECEIVE_PATIENT,
    patientId,
    data: json,
    receivedAt: Date.now(),
  };
}

function useMock() {
  return process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'mock';
}

export function fetchPatient(fhirUrl, patientId) {
  if (useMock()) {
    const json = require('../mock/patient.json'); // eslint-disable-line
    return dispatch => dispatch(receivePatient(patientId, json));
  }

  return dispatch => {
    dispatch(requestPatient(patientId));
    const url =
    `${fhirUrl}/Patient/${patientId}`;
    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receivePatient(patientId, json)));
  };
}
