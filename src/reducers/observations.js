import {
  REQUEST_OBSERVATIONS, RECEIVE_OBSERVATIONS, RECEIVE_OBSERVATIONS_FAILED,
} from '../actions/observations';
import { RESET_PATIENT_DATA } from '../actions/patient';

function observations(state = {
  isFetching: false,
  data: null,
  error: null,
}, action) {
  switch (action.type) {
  case RESET_PATIENT_DATA:
    return Object.assign({}, state, {
      isFetching: false,
      data: null,
      error: null,
    });
  case REQUEST_OBSERVATIONS:
    return Object.assign({}, state, {
      isFetching: true,
      data: null,
      error: null,
    });
  case RECEIVE_OBSERVATIONS:
    return Object.assign({}, state, {
      isFetching: false,
      data: action.data,
      lastUpdated: action.receivedAt,
    });
  case RECEIVE_OBSERVATIONS_FAILED:
    return Object.assign({}, state, {
      isFetching: false,
      error: action.error,
    });
  default:
    return state;
  }
}

export function observationsByCode(state = { }, action) {
  switch (action.type) {
  case REQUEST_OBSERVATIONS:
  case RECEIVE_OBSERVATIONS:
  case RECEIVE_OBSERVATIONS_FAILED:
    return Object.assign({}, state, {
      [action.code]: observations(state[action.code], action),
    });
  default:
    return state;
  }
}

