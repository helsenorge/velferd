import {
  INVALIDATE_CAREPLAN, REQUEST_CAREPLAN, RECEIVE_CAREPLAN, COMPLETE_SAVE_CAREPLAN,
  REQUEST_CAREPLAN_HISTORY, RECEIVE_CAREPLAN_HISTORY,
} from '../actions/care-plan';
import { RESET_PATIENT_DATA } from '../actions/patient';

export function carePlan(state = {
  isFetching: false,
  didInvalidate: false,
  data: null,
  saveCompleted: null,
  error: null,
  history: null,
}, action) {
  switch (action.type) {
  case RESET_PATIENT_DATA:
    return Object.assign({}, state, {
      isFetching: false,
      data: null,
      history: null,
      error: null,
    });
  case INVALIDATE_CAREPLAN:
    return Object.assign({}, state, {
      didInvalidate: true,
    });
  case REQUEST_CAREPLAN:
    return Object.assign({}, state, {
      isFetching: true,
      didInvalidate: false,
      data: null,
      saveCompleted: null,
      error: null,
    });
  case RECEIVE_CAREPLAN:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      data: action.data,
      lastUpdated: action.receivedAt,
    });
  case REQUEST_CAREPLAN_HISTORY:
    return Object.assign({}, state, {
      history: { isFetching: true, data: null },
    });
  case RECEIVE_CAREPLAN_HISTORY:
    return Object.assign({}, state, {
      history: {
        isFetching: false,
        data: action.data,
        lastUpdated: action.receivedAt },
    });
  case COMPLETE_SAVE_CAREPLAN:
    return Object.assign({}, state, {
      saveCompleted: action.saveCompleted,
      error: action.error,
    });
  default:
    return state;
  }
}
