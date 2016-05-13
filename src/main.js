import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import './main.scss';
import configureStore from './store/configureStore';
import { fetchObservations } from './actions/observations';

const store = configureStore();

console.log(store.getState());
store.subscribe(() =>
  console.log(store.getState())
);

const fhirUrl = 'http://continua.cloudapp.net/baseDstu2';
store.dispatch(fetchObservations(fhirUrl, '188736', '1-26'));

ReactDOM.render(
  <App />,
  document.getElementById('container')
);
