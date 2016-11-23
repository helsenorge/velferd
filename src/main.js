import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import routes from './routes';
import './main.scss';
import configureStore from './store/configureStore';
import { setAuthenticate, setFhirUrl } from './actions/settings';
import { setAuthToken, setUseXAuthTokenHeader } from './actions/auth';

const store = configureStore();

if (window.location.search.indexOf('access_token=') !== -1) {
  const token = window.location.search.replace('?access_token=', '');
  store.dispatch(setAuthToken(token, null));
  store.dispatch(setFhirUrl('http://helsamitest.imatiscloud.com/Imatis/WebServices/External/FHIR/fhir'));
  store.dispatch(setAuthenticate(true));
  store.dispatch(setUseXAuthTokenHeader(true));
}

if (window.location.hostname === 'apps.ehelselab.com') {
  store.dispatch(setAuthenticate(true));
  store.dispatch(setFhirUrl('http://apps.ehelselab.com/fhir'));
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory} routes={routes} />
  </Provider>,
  document.getElementById('container')
);
