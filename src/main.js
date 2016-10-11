import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import routes from './routes';
import './main.scss';
import configureStore from './store/configureStore';
import { setAuthenticate, setFhirUrl } from './actions/settings';

const store = configureStore();

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
