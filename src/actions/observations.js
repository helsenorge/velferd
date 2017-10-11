import { get } from '../helpers/api';
import { discardAuthToken } from '../actions/auth';
import { formatDate3 } from '../helpers/date-helpers';

export const REQUEST_NEXT_OBSERVATIONS = 'REQUEST_NEXT_OBSERVATIONS';
export const REQUEST_OBSERVATIONS = 'REQUEST_OBSERVATIONS';
export const RECEIVE_OBSERVATIONS = 'RECEIVE_OBSERVATIONS';
export const RECEIVE_OBSERVATIONS_FAILED = 'RECEIVE_OBSERVATIONS_FAILED';

function requestNextObservations(code, patientId) {
  return {
    type: REQUEST_NEXT_OBSERVATIONS,
    code,
    patientId,
  };
}

function requestObservations(code, patientId, from, to) {
  return {
    type: REQUEST_OBSERVATIONS,
    code,
    patientId,
    from,
    to,
  };
}

function receiveObservations(code, patientId, json) {
  return {
    type: RECEIVE_OBSERVATIONS,
    code,
    patientId,
    data: json,
    receivedAt: Date.now(),
  };
}

function receiveObservationsFailed(code, patientId, error) {
  return {
    type: RECEIVE_OBSERVATIONS_FAILED,
    code,
    patientId,
    error,
  };
}

function fixNextUrl(url, fhirUrl) {
  const page = url.substring(url.indexOf('?'));
  return `${fhirUrl}/${page}`;
}

export function fetchNextObservations(code, patientId, url) {
  return (dispatch, getState) => {
    const { token, expiration, useXAuthTokenHeader } = getState().auth;
    const { authenticate, fhirUrl } = getState().settings;

    if (authenticate && (!token || (expiration && new Date().valueOf() > expiration.valueOf()))) {
      return dispatch(discardAuthToken());
    }

    dispatch(requestNextObservations(code, patientId));

    return get(url, token, useXAuthTokenHeader)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveObservations(code, patientId, json));

        if (json.link) {
          const nextLink = json.link.filter(link => link.relation === 'next');
          if (nextLink && nextLink.length > 0) {
            const nextURL = fixNextUrl(nextLink[0].url, fhirUrl);
            dispatch(fetchNextObservations(code, patientId, nextURL));
          }
        }
      },
      error => dispatch(receiveObservationsFailed(code, patientId, error)));
  };
}

export function fetchObservations(code, from, to, patientId) {
  return (dispatch, getState) => {
    const { token, expiration, useXAuthTokenHeader } = getState().auth;
    const { authenticate, fhirUrl } = getState().settings;

    if (authenticate && (!token || (expiration && new Date().valueOf() > expiration.valueOf()))) {
      return dispatch(discardAuthToken());
    }

    const observations = getState().observationsByCode[code];
    if (observations && from.getTime() >= new Date(observations.from).getTime()) {
      return null;
    }

    // request data starting 7 days before the start date shown
    const requestFrom = new Date(from.getTime());
    requestFrom.setDate(requestFrom.getDate() - 7);

    let requestTo = to;
    if (observations) {
      requestTo = new Date(observations.from);
      requestTo.setDate(requestTo.getDate() - 1);
    }

    const url = `${fhirUrl}/Observation?_count=10000&_sort:desc=date`
     + `&code=${code}&patient._id=${patientId}`
      + `&date=>=${formatDate3(requestFrom)}&date=<=${formatDate3(requestTo)}`;

    dispatch(requestObservations(
      code,
      patientId,
      requestFrom.toJSON(),
      observations ? observations.to : to.toJSON())
    );

    return get(url, token, useXAuthTokenHeader)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveObservations(code, patientId, json));

        if (json.link) {
          const nextLink = json.link.filter(link => link.relation === 'next');
          if (nextLink && nextLink.length > 0) {
            const url = fixNextUrl(nextLink[0].url, fhirUrl);
            dispatch(fetchNextObservations(code, patientId, url));
          }
        }
      },
      error => {
        console.log(url);
        console.log(error);
        dispatch(receiveObservationsFailed(code, patientId, error));
      }
    );
  };
}

