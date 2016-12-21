import {
  REQUEST_OBSERVATIONS,
  REQUEST_NEXT_OBSERVATIONS,
  RECEIVE_OBSERVATIONS,
  RECEIVE_OBSERVATIONS_FAILED,
} from '../actions/observations';
import { RESET_PATIENT_DATA } from '../actions/patient';

function observations(state = {
  isFetching: false,
  data: [],
  error: null,
  from: null,
  to: null,
}, action) {
  switch (action.type) {
  case RESET_PATIENT_DATA:
    return Object.assign({}, state, {
      isFetching: false,
      data: [],
      error: null,
      from: null,
      to: null,
    });
  case REQUEST_OBSERVATIONS:
    return Object.assign({}, state, {
      isFetching: true,
      from: action.from,
      to: action.to,
      error: null,
    });
  case REQUEST_NEXT_OBSERVATIONS:
    return Object.assign({}, state, {
      isFetching: true,
    });
  case RECEIVE_OBSERVATIONS: {
    const actionData = action.data.entry ? action.data.entry : [];
    const data = [...state.data, ...actionData];
    return Object.assign({}, state, {
      isFetching: false,
      data,
      lastUpdated: action.receivedAt,
    });
  }
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
  case RESET_PATIENT_DATA:
    return {};
  case REQUEST_OBSERVATIONS:
  case REQUEST_NEXT_OBSERVATIONS:
  case RECEIVE_OBSERVATIONS:
  case RECEIVE_OBSERVATIONS_FAILED:
    return Object.assign({}, state, {
      [action.code]: observations(state[action.code], action),
    });
  default:
    return state;
  }
}

