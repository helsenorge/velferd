import { get } from '../helpers/api';
import { discardAuthToken } from '../actions/auth';
import { BirthNumberSystemIdentifier } from '../constants/patient.js';

export const SET_ACTIVE_PATIENT = 'SET_ACTIVE_PATIENT';
export const REQUEST_PATIENT = 'REQUEST_PATIENT';

export const REQUEST_PATIENTS = 'REQUEST_PATIENTS';
export const RECEIVE_PATIENTS = 'RECEIVE_PATIENTS';

export function setActivePatient(patient) {
  return {
    type: SET_ACTIVE_PATIENT,
    patient,
  };
}

function requestPatient(patientId) {
  return {
    type: REQUEST_PATIENT,
    patientId,
  };
}

function requestPatients(name) {
  return {
    type: REQUEST_PATIENTS,
    name,
  };
}

function receivePatients(json) {
  return {
    type: RECEIVE_PATIENTS,
    data: json,
    receivedAt: Date.now(),
  };
}

export function fetchPatients(fhirUrl, name) {
  return (dispatch, getState) => {
    const { token, expiration } = getState().auth;
    const { authenticate } = getState().settings;

    if (authenticate && (!token || new Date().valueOf() > expiration.valueOf())) {
      return dispatch(discardAuthToken());
    }

    dispatch(requestPatients());
    const url =
    `${fhirUrl}/Patient?_count=500&name=${name}`;
    return get(url, token)
      .then(response => response.json())
      .then(json => dispatch(receivePatients(json)));
  };
}

export function fetchPatientByIdentifier(fhirUrl, value) {
  return (dispatch, getState) => {
    const { token, expiration } = getState().auth;
    const { authenticate } = getState().settings;

    if (authenticate && (!token || new Date().valueOf() > expiration.valueOf())) {
      return dispatch(discardAuthToken());
    }

    dispatch(requestPatients());
    const identifier = `${BirthNumberSystemIdentifier}|${value}`;
    const url = `${fhirUrl}/Patient?identifier=${identifier}`;
    return get(url, token)
      .then(response => response.json())
      .then(json => dispatch(receivePatients(json)));
  };
}

export function fetchAndSetActivePatient(fhirUrl, patientId) {
  return (dispatch, getState) => {
    const { token, expiration } = getState().auth;
    const { authenticate } = getState().settings;

    if (authenticate && (!token || new Date().valueOf() > expiration.valueOf())) {
      return dispatch(discardAuthToken());
    }

    dispatch(requestPatient(patientId));
    const url =
    `${fhirUrl}/Patient/${patientId}`;
    return get(url, token)
      .then(response => response.json())
      .then(json => dispatch(setActivePatient(json)));
  };
}
