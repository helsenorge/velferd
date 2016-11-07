import {
  REQUEST_PATIENT, RECEIVE_PATIENT,
  REQUEST_PATIENTS, RECEIVE_PATIENTS,
  SET_ACTIVE_PATIENT,
} from '../actions/patient';

export function patient(state = {
  isFetching: false,
  data: null,
  activePatient: null,
}, action) {
  switch (action.type) {
  case SET_ACTIVE_PATIENT:
    return Object.assign({}, state, {
      activePatient: action.patient,
    });
  case REQUEST_PATIENT:
    return Object.assign({}, state, {
      isFetching: true,
    });
  case RECEIVE_PATIENT:
    return Object.assign({}, state, {
      isFetching: false,
      data: action.data,
      lastUpdated: action.receivedAt,
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
