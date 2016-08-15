import { combineReducers } from 'redux';
import { observationsByCode } from './observations';
import { settings } from './settings';
import { patient } from './patient';
import { questionnaireResponses } from './questionnaire-responses';

const rootReducer = combineReducers({
  observationsByCode,
  settings,
  patient,
  questionnaireResponses,
});

export default rootReducer;
