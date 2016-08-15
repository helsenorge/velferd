import {
  REQUEST_PATIENT, RECEIVE_PATIENT,
} from '../actions/patient';

export function patient(state = {
  isFetching: false,
  data: null,
}, action) {
  switch (action.type) {
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
  default:
    return state;
  }
}
