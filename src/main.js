import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/app.jsx';
import './main.scss';
import configureStore from './store/configureStore';

const store = configureStore();

console.log(store.getState());
store.subscribe(() =>
  console.log(store.getState())
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('container')
);
