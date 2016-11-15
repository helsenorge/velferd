import ansikt1 from '../../svg/face1.svg';
import ansikt2 from '../../svg/face2.svg';
import ansikt3 from '../../svg/face3.svg';
import QuestionnaireResponseCodes from '../constants/questionnaire-response-codes';

export function getIcon(value) {
  switch (value) {
  case QuestionnaireResponseCodes.green.toString():
    return ansikt3;
  case QuestionnaireResponseCodes.yellow.toString():
    return ansikt2;
  case QuestionnaireResponseCodes.red.toString():
    return ansikt1;
  default:
    return null;
  }
}
