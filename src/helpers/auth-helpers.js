import { stringify } from 'qs';

const authUri = 'https://adfs.fia.nhn.no/adfs/oauth2/authorize';

const params = {
  client_id: 'db2d3cc9-d5ba-4300-9b9d-29f865d0ac70',
  redirect_uri: 'http://apps.ehelselab.com/velferd/',
  response_type: 'token',
  resource: 'http://apps.ehelselab.com/velferd/api/',
  scope: 'patient/*.*',
  nonce: '6130755535249629',
  state: '3(#0/!~',
};

export function redirectToAuthenticateUri() {
  const uri = `${authUri}?${stringify(params)}`;
  window.location = uri;
}
