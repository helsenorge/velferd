import 'whatwg-fetch';

export function get(url, token) {
  let init;

  if (token) {
    init = {
      method: 'get',
      headers: { Authorization: `Bearer ${token}` },
    };
  }

  return fetch(url, init);
}

export function put(url, data, token) {
  const init = {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  };

  if (token) {
    init.headers = { Authorization: `Bearer ${token}` };
  }

  return fetch(url, init);
}

export function post(url, data, token) {
  const init = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  };

  if (token) {
    init.headers = { Authorization: `Bearer ${token}` };
  }

  return fetch(url, init);
}
