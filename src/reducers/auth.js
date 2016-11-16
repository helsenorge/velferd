import {
  SET_AUTH_TOKEN, DISCARD_AUTH_TOKEN, SET_USE_X_AUTH_TOKEN_HEADER,
} from '../actions/auth';

export function auth(state = {
  token: null,
  expiration: null,
  useXAuthTokenHeader: false,
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
  case SET_USE_X_AUTH_TOKEN_HEADER:
    return Object.assign({}, state, {
      useXAuthTokenHeader: action.useXAuthToken,
    });
  default:
    return state;
  }
}
