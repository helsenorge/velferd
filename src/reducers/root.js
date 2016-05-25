import { combineReducers } from 'redux';
import { observationsByCode } from './observations';
import { settings } from './settings';
import { patient } from './patient';

const rootReducer = combineReducers({
  observationsByCode,
  settings,
  patient,
});

export default rootReducer;
