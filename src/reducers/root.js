import { combineReducers } from 'redux';
import { observationsByCode } from './observations';
import { settings } from './settings';
import { patient } from './patient';
import { questionnaireResponses } from './questionnaire-responses';
import { carePlan } from './care-plan';

const rootReducer = combineReducers({
  observationsByCode,
  settings,
  patient,
  questionnaireResponses,
  carePlan,
});

export default rootReducer;
