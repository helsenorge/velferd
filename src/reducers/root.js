import { combineReducers } from 'redux';
import { observationsByCode } from './observations';
import { settings } from './settings';
import { patient } from './patient';
import { questionnaireResponses } from './questionnaire-responses';
import { carePlan } from './care-plan';
import { auth } from './auth';

const rootReducer = combineReducers({
  observationsByCode,
  settings,
  patient,
  questionnaireResponses,
  carePlan,
  auth,
});

export default rootReducer;
