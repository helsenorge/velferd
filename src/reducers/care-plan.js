import {
  REQUEST_CAREPLAN, RECEIVE_CAREPLAN,
} from '../actions/care-plan';

export function carePlan(state = {
  isFetching: false,
  data: null,
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
  default:
    return state;
  }
}
