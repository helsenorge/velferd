import { get } from '../helpers/api';
import { discardAuthToken } from '../actions/auth';
import { BirthNumberSystemIdentifier } from '../constants/patient.js';
import { fetchCarePlan } from '../actions/care-plan';

export const RESET_PATIENT_DATA = 'RESET_PATIENT_DATA';
export const SET_ACTIVE_PATIENT = 'SET_ACTIVE_PATIENT';
export const REQUEST_PATIENT = 'REQUEST_PATIENT';

export const REQUEST_PATIENTS = 'REQUEST_PATIENTS';
export const RECEIVE_PATIENTS = 'RECEIVE_PATIENTS';

export function resetPatientData() {
  return {
    type: RESET_PATIENT_DATA,
  };
}

function setActivePatient(patient) {
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

export function fetchPatients(name) {
  return (dispatch, getState) => {
    const { token, expiration, useXAuthTokenHeader } = getState().auth;
    const { authenticate, fhirUrl } = getState().settings;

    if (authenticate && (!token || (expiration && new Date().valueOf() > expiration.valueOf()))) {
      return dispatch(discardAuthToken());
    }

    dispatch(requestPatients());
    const nameQuery = name ? `&name=${name}` : '';
    const url = `${fhirUrl}/Patient?_count=500${nameQuery}`;
    return get(url, token, useXAuthTokenHeader)
      .then(response => response.json())
      .then(json => dispatch(receivePatients(json)));
  };
}

export function fetchPatientByIdentifier(value) {
  return (dispatch, getState) => {
    const { token, expiration, useXAuthTokenHeader } = getState().auth;
    const { authenticate, fhirUrl } = getState().settings;

    if (authenticate && (!token || (expiration && new Date().valueOf() > expiration.valueOf()))) {
      return dispatch(discardAuthToken());
    }

    dispatch(requestPatients());
    const identifier = `${BirthNumberSystemIdentifier}|${value}`;
    const url = `${fhirUrl}/Patient?identifier=${identifier}`;
    return get(url, token, useXAuthTokenHeader)
      .then(response => response.json())
      .then(json => dispatch(receivePatients(json)));
  };
}

export function changePatient(patient) {
  return (dispatch) => {
    dispatch(resetPatientData());
    dispatch(setActivePatient(patient));
    dispatch(fetchCarePlan(patient.id));
    return Promise.resolve();
  };
}

export function changePatientWithId(patientId) {
  return (dispatch, getState) => {
    const { token, expiration, useXAuthTokenHeader } = getState().auth;
    const { authenticate, fhirUrl } = getState().settings;

    if (authenticate && (!token || (expiration && new Date().valueOf() > expiration.valueOf()))) {
      return dispatch(discardAuthToken());
    }

    dispatch(requestPatient(patientId));
    dispatch(fetchCarePlan(patientId));
    const url = `${fhirUrl}/Patient/${patientId}`;
    return get(url, token, useXAuthTokenHeader)
      .then(response => response.json())
      .then(json => dispatch(setActivePatient(json)));
  };
}
