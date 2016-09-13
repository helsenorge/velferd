export const SET_FHIR_URL = 'SET_FHIR_URL';
export const SET_AUTHENTICATE = 'SET_AUTHENTICATE';

export function setFhirUrl(url) {
  return {
    type: SET_FHIR_URL,
    url,
  };
}

export function setAuthenticate(authenticate) {
  return {
    type: SET_AUTHENTICATE,
    authenticate,
  };
}
