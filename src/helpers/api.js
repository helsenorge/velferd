import 'whatwg-fetch';

export function get(url, token, useXAuthTokenHeader) {
  const headers = new Headers();
  headers.append('Accept', 'application/json+fhir');

  if (token) {
    if (useXAuthTokenHeader) {
      headers.append('X-Auth-Token', token);
    }
    else {
      headers.append('Authorization', `Bearer ${token}`);
    }
  }

  const init = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers,
  };

  return fetch(url, init);
}

export function put(url, data, token, useXAuthTokenHeader) {
  const headers = new Headers();

  if (token) {
    if (useXAuthTokenHeader) {
      headers.append('X-Auth-Token', token);
    }
    else {
      headers.append('Authorization', `Bearer ${token}`);
    }
  }

  headers.append('Content-Type', 'application/json');

  const init = {
    method: 'PUT',
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(data),
    headers,
  };

  return fetch(url, init);
}

export function post(url, data, token, useXAuthTokenHeader) {
  const headers = new Headers();

  if (token) {
    if (useXAuthTokenHeader) {
      headers.append('X-Auth-Token', token);
    }
    else {
      headers.append('Authorization', `Bearer ${token}`);
    }
  }

  headers.append('Content-Type', 'application/json');

  const init = {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(data),
    headers,
  };

  return fetch(url, init);
}
