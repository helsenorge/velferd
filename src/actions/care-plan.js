import { get, put } from '../helpers/api';
import { discardAuthToken } from '../actions/auth';
import { getObservationCodingDisplay } from '../helpers/observation-helpers';

export const REQUEST_CAREPLAN = 'REQUEST_CAREPLAN';
export const RECEIVE_CAREPLAN = 'RECEIVE_CAREPLAN';
export const COMPLETE_SAVE_CAREPLAN = 'COMPLETE_SAVE_CAREPLAN';
export const REQUEST_CAREPLAN_HISTORY = 'REQUEST_CAREPLAN_HISTORY';
export const RECEIVE_CAREPLAN_HISTORY = 'RECEIVE_CAREPLAN_HISTORY';

function requestCarePlan(patientId) {
  return {
    type: REQUEST_CAREPLAN,
    patientId,
  };
}

function receiveCarePlan(patientId, json) {
  return {
    type: RECEIVE_CAREPLAN,
    patientId,
    data: json,
    receivedAt: Date.now(),
  };
}

function requestCarePlanHistory(carePlanId) {
  return {
    type: REQUEST_CAREPLAN_HISTORY,
    carePlanId,
  };
}

function receiveCarePlanHistory(carePlanId, json) {
  return {
    type: RECEIVE_CAREPLAN_HISTORY,
    carePlanId,
    data: json,
    receivedAt: Date.now(),
  };
}

function completeSaveCarePlan(saveCompleted, error) {
  return {
    type: COMPLETE_SAVE_CAREPLAN,
    saveCompleted,
    error,
  };
}

function useMock() {
  return process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'mock';
}

export function fetchCarePlanHistory(fhirUrl, carePlanId) {
  return (dispatch, getState) => {
    const { token, expiration } = getState().auth;
    const { authenticate } = getState().settings;

    if (authenticate && (!token || new Date().valueOf() > expiration.valueOf())) {
      return dispatch(discardAuthToken());
    }

    dispatch(requestCarePlanHistory(carePlanId));
    const url = `${fhirUrl}/CarePlan/${carePlanId}/_history`;
    return get(url, token)
      .then(response => response.json())
      .then(json => dispatch(receiveCarePlanHistory(carePlanId, json)));
  };
}

export function fetchCarePlan(fhirUrl, patientId) {
  if (useMock()) {
    const json = require( `../mock/care-plan.json`); // eslint-disable-line
    return dispatch => dispatch(receiveCarePlan(patientId, json));
  }

  return (dispatch, getState) => {
    const { token, expiration } = getState().auth;
    const { authenticate } = getState().settings;

    if (authenticate && (!token || new Date().valueOf() > expiration.valueOf())) {
      return dispatch(discardAuthToken());
    }

    dispatch(requestCarePlan(patientId));
    const url = `${fhirUrl}/CarePlan?subject=${patientId}`;
    return get(url, token)
      .then(response => response.json())
      .then(json => dispatch(receiveCarePlan(patientId, json)));
  };
}

function buildCoding(system, code, display) {
  return { system, code, display };
}

function buildActivity(description, reasonCode, category) {
  return {
    detail: {
      category: {
        coding: [buildCoding('http://hl7.org/fhir/care-plan-activity-category', category, '')],
      },
      description,
      reasonCode: [{
        coding: [buildCoding('http://ehelse.no/fhir/vft', reasonCode, '')],
      }],
    },
  };
}

function buildTarget(goal) {
  return {
    extension: [
      {
        url: 'goal-target.measure',
        valueCodeableConcept: {
          coding: [buildCoding(
            'urn:std:iso:11073:10101', goal.code, getObservationCodingDisplay(goal.code))],
        },
      },
      {
        url: 'goal-target.detail',
        valueRange: { low: goal.low, high: goal.high },
      },
    ],
    url: 'http://hl7.org/fhir/StructureDefinition/goal-target',
  };
}

function buildObservationGoal(reasonCode, measurement) {
  const extension = [];

  measurement.goal.forEach(goal => {
    const target = buildTarget(goal);
    extension.push(target);
  });

  return {
    resourceType: 'Goal',
    id: `${reasonCode}-goal-${measurement.code}`,
    extension,
  };
}

function buildObservationActivityCondition(reasonCode, measurement) {
  const activity = buildActivity('', reasonCode, 'observation');
  activity.detail.scheduledTiming = { repeat: { frequency: 1, period: 1, periodUnits: 'wk' } };
  activity.detail.code = { coding: [buildCoding('urn:std:iso:11073:10101',
      measurement.code, getObservationCodingDisplay(measurement.code))],
  };

  const goal = buildObservationGoal(reasonCode, measurement);
  activity.detail.goal = [{ reference: `#${goal.id}` }];
  return { activity, goal };
}

function buildCondition(symptom, reasonCode, number) {
  return {
    resourceType: 'Condition',
    id: `${reasonCode}-condition-${number}`,
    notes: symptom,
  };
}

function buildGoal(id, description) {
  return {
    resourceType: 'Goal',
    id,
    description,
  };
}

export function saveCarePlan(fhirUrl, patientId, carePlan) {
  return (dispatch, getState) => {
    const { data } = getState().carePlan;
    const resource = Object.assign({}, data.entry[0].resource);
    const phases = carePlan.phases;

    const id = resource.id;
    const url = `${fhirUrl}/CarePlan/${id}`;
    const activities = [];
    const contained = resource.contained.filter(res => res.resourceType !== 'Condition'
      && res.resourceType !== 'Goal');

    // Patient Goal
    const goal = buildGoal('patient-goal', carePlan.patientGoal);
    contained.push(goal);
    resource.goal = [{ reference: `#${goal.id}` }];

    phases.forEach(phase => {
      // Actions
      phase.actions.forEach(action => {
        const activity = buildActivity(action, phase.reasonCode, 'procedure');
        activities.push(activity);
      });
      // Drugs
      phase.medications.forEach(drug => {
        const activity = buildActivity(drug, phase.reasonCode, 'drug');
        activities.push(activity);
      });
      // Measurements
      phase.measurements.forEach(measurement => {
        const data = buildObservationActivityCondition(phase.reasonCode, measurement);
        activities.push(data.activity);
        contained.push(data.goal);
      });
      // Questionnaire
      const activity = buildActivity('', phase.reasonCode, 'observation');
      activity.detail.scheduledTiming = { repeat: { frequency: 1, period: 1, periodUnits: 'wk' } };
      activity.detail.extension = [{
        url: 'http://ehelse.no/fhir/vft',
        valueReference: { reference: `Questionnaire/${phase.questionnaireId}` },
      }];
      activity.detail.reasonReference = [];
      // Conditions
      phase.symptoms.forEach((symptom, index) => {
        const condition = buildCondition(symptom, phase.reasonCode, index + 1);
        contained.push(condition);
        activity.detail.reasonReference.push({ reference: `#${condition.id}` });
      });

      activities.push(activity);
    });

    delete resource.id;
    resource.activity = activities;
    resource.contained = contained;

    return put(url, resource)
      .then(() => {
        dispatch(completeSaveCarePlan(true));
        dispatch(fetchCarePlan(fhirUrl, patientId));
      })
      .catch(error => dispatch(completeSaveCarePlan(false, `Saving failed. ${error}`)));
  };
}
