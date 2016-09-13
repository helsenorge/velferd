export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const DISCARD_AUTH_TOKEN = 'DISCARD_AUTH_TOKEN';

export function setAuthToken(token, expiration) {
  return {
    type: SET_AUTH_TOKEN,
    token,
    expiration,
  };
}

export function discardAuthToken() {
  return {
    type: DISCARD_AUTH_TOKEN,
  };
}
