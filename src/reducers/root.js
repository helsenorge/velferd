import { combineReducers } from 'redux';
import { observationsByCode } from './observations';
import { settings } from './settings';

const rootReducer = combineReducers({
  observationsByCode,
  settings,
});

export default rootReducer;
