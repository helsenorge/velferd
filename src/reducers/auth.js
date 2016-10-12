import {
  SET_AUTH_TOKEN, DISCARD_AUTH_TOKEN,
} from '../actions/auth';

export function auth(state = {
  token: null,
  expiration: null,
  user: { name: { family: '', given: 'Test-bruker' } },
}, action) {
  switch (action.type) {
  case SET_AUTH_TOKEN:
    return Object.assign({}, state, {
      token: action.token,
      expiration: action.expiration,
    });
  case DISCARD_AUTH_TOKEN:
    return Object.assign({}, state, {
      token: null,
      expiration: null,
    });
  default:
    return state;
  }
}
