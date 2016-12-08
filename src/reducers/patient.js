import {
  REQUEST_PATIENT,
  REQUEST_PATIENTS,
  RECEIVE_PATIENTS,
  SET_ACTIVE_PATIENT,
  RESET_PATIENT_DATA,
} from '../actions/patient';

export function patient(state = {
  isFetching: false,
  data: null,
  activePatient: null,
}, action) {
  switch (action.type) {
  case RESET_PATIENT_DATA:
    return Object.assign({}, state, {
      isFetching: false,
      data: null,
      activePatient: null,
    });
  case SET_ACTIVE_PATIENT:
    return Object.assign({}, state, {
      activePatient: action.patient,
      isFetching: false,
    });
  case REQUEST_PATIENT:
    return Object.assign({}, state, {
      isFetching: true,
    });
  case REQUEST_PATIENTS:
    return Object.assign({}, state, {
      isFetching: true,
    });
  case RECEIVE_PATIENTS:
    return Object.assign({}, state, {
      isFetching: false,
      data: action.data,
      lastUpdated: action.receivedAt,
    });
  default:
    return state;
  }
}
