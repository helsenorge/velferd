import 'whatwg-fetch';

export function get(url, token, useXAuthTokenHeader) {
  let init;

  if (token) {
    init = useXAuthTokenHeader ? {
      method: 'get',
      headers: { 'X-Auth-Token': `${token}` },
    }
    : {
      method: 'get',
      headers: { Authorization: `Bearer ${token}` },
    };
  }

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

  const init = {
    method: 'POST',
    body: JSON.stringify(data),
    headers,
  };

  return fetch(url, init);
}
