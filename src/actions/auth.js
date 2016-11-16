export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const DISCARD_AUTH_TOKEN = 'DISCARD_AUTH_TOKEN';
export const SET_USE_X_AUTH_TOKEN_HEADER = 'SET_USE_X_AUTH_TOKEN_HEADER';

export function setAuthToken(token, expiration) {
  return {
    type: SET_AUTH_TOKEN,
    token,
    expiration,
  };
}

export function setUseXAuthTokenHeader(useXAuthToken) {
  return {
    type: SET_USE_X_AUTH_TOKEN_HEADER,
    useXAuthToken,
  };
}

export function discardAuthToken() {
  return {
    type: DISCARD_AUTH_TOKEN,
  };
}
