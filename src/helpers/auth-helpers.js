import { stringify } from 'qs';

const ehelseLabAuthUri = 'http://access.ehelselab.com/authorize';

const ehelseLabParams = {
  client_id: 'avstand',
  redirect_uri: 'http://apps.ehelselab.com/velferd/loggedin',
  response_type: 'token',
  scope: 'patient/*.*',
  nonce: '6130755535249629',
  state: '3(#0/!~',
};

export function redirectToAuthenticateUri() {
  const uri = `${ehelseLabAuthUri}?${stringify(ehelseLabParams)}`;
  window.location = uri;
}
