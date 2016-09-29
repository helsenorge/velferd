import {
  REQUEST_CAREPLAN, RECEIVE_CAREPLAN, COMPLETE_SAVE_CAREPLAN,
  REQUEST_CAREPLAN_HISTORY, RECEIVE_CAREPLAN_HISTORY,
} from '../actions/care-plan';

export function carePlan(state = {
  isFetching: false,
  data: null,
  saveCompleted: null,
  error: null,
  history: null,
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
