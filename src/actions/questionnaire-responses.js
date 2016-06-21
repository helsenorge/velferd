import fetch from 'isomorphic-fetch';

export const REQUEST_QUESTIONNAIRE_RESPONSES = 'REQUEST_QUESTIONNAIRE_RESPONSES';
export const RECEIVE_QUESTIONNAIRE_RESPONSES = 'RECEIVE_QUESTIONNAIRE_RESPONSES';

function requestQuestionnaireResponses(patientId) {
  return {
    type: REQUEST_QUESTIONNAIRE_RESPONSES,
    patientId,
  };
}

function receivetQuestionnaireResponses(patientId, json) {
  return {
    type: RECEIVE_QUESTIONNAIRE_RESPONSES,
    patientId,
    data: json,
    receivedAt: Date.now(),
  };
}

export function fetchQuestionnaireResponses(fhirUrl, patientId, questionnaireId) {
  return dispatch => {
    dispatch(requestQuestionnaireResponses(patientId));
    const url =
    `${fhirUrl}/QuestionnaireResponse?_sort:asc=authored&patient=${patientId}
    &questionnaire=${questionnaireId}`;
    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receivetQuestionnaireResponses(patientId, json)));
  };
}
