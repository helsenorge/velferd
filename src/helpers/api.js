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
