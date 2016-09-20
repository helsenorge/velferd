import {
  REQUEST_CAREPLAN, RECEIVE_CAREPLAN, COMPLETE_SAVE_CAREPLAN,
} from '../actions/care-plan';

export function carePlan(state = {
  isFetching: false,
  data: null,
  saveCompleted: null,
  error: null,
}, action) {
  switch (action.type) {
  case REQUEST_CAREPLAN:
    return Object.assign({}, state, {
      isFetching: true,
    });
  case RECEIVE_CAREPLAN:
    return Object.assign({}, state, {
      isFetching: false,
      data: action.data,
      lastUpdated: action.receivedAt,
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
