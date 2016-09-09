export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';

export function setAuthToken(token) {
  return {
    type: SET_AUTH_TOKEN,
    token,
  };
}
