import {
  SET_AUTH_TOKEN,
} from '../actions/auth';

export function auth(state = {
  token: null,
}, action) {
  switch (action.type) {
  case SET_AUTH_TOKEN:
    return Object.assign({}, state, {
      token: action.token,
    });
  default:
    return state;
  }
}
