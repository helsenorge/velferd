import { get, put, post } from '../helpers/api';
import { discardAuthToken } from '../actions/auth';
import { getObservationCodingDisplay } from '../helpers/observation-helpers';
import { buildCarePlan } from '../helpers/care-plan-builder';
import CarePlanCategories from '../constants/care-plan-categories';

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
  const low = { code: goal.low.code, system: goal.low.system, unit: goal.low.unit };
  const high = { code: goal.high.code, system: goal.high.system, unit: goal.high.unit };

  if (goal.low.value.toString().trim() !== '') {
    low.value = goal.low.value;
  }
  if (goal.high.value.toString().trim() !== '') {
    high.value = goal.high.value;
  }

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
        valueRange: { low, high },
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

function buildCategory(category) {
  switch (category) {
  case CarePlanCategories.HeartFailure:
    return { coding: [{ system: 'http://hl7.org/fhir/ValueSet/care-plan-category', code: '412776001' }] };
  case CarePlanCategories.COPD:
    return { coding: [{ system: 'http://hl7.org/fhir/ValueSet/care-plan-category', code: '698361000' }] };
  default:
    return null;
  }
}

function buildCarePlanResource(user, patientId, category, goal, note, activity, contained) {
  contained.push({
    resourceType: 'Practitioner',
    id: 'pr1',
    name: { family: [user.name.family], given: [user.name.given] } });

  contained.push({
    resourceType: 'Organization',
    id: 'org1',
    name: 'Response center' });

  return {
    resourceType: 'CarePlan',
    text: {
      status: 'additional',
      div: '<div>Sample care plan</div>',
    },
    subject: { reference: `Patient/${patientId}` },
    contained,
    status: 'active',
    author: [{ reference: '#pr1' }],
    participant: [
      {
        role: { text: 'Patient' },
        member: { reference: `Patient/${patientId}` },
      },
      {
        role: { text: 'GP' },
        member: { reference: '#pr1' },
      },
      {
        role: { text: 'Response Center' },
        member: { reference: '#org1' },
      },
    ],
    category,
    goal,
    note,
    activity,
  };
}

function toFhirCarePlan(patientId, carePlan, user) {
  const activities = [];
  const contained = [];

  contained.push(buildGoal('patient-goal', carePlan.patientGoal));
  const goal = [{ reference: '#patient-goal' }];
  const note = [{ text: carePlan.comment }];
  const category = [buildCategory(carePlan.category)];

  carePlan.phases.forEach(phase => {
      // Actions
    phase.actions.filter(a => a.trim() !== '').forEach(action => {
      const activity = buildActivity(action, phase.reasonCode, 'procedure');
      activities.push(activity);
    });
      // Drugs
    phase.medications.filter(d => d.trim() !== '').forEach(drug => {
      const activity = buildActivity(drug, phase.reasonCode, 'drug');
      activities.push(activity);
    });
      // Symptoms
    const activity = buildActivity('', phase.reasonCode, 'other');
    activity.detail.reasonReference = [];
      // Conditions
    phase.symptoms.filter(s => s.trim() !== '').forEach((symptom, index) => {
      const condition = buildCondition(symptom, phase.reasonCode, index + 1);
      contained.push(condition);
      activity.detail.reasonReference.push({ reference: `#${condition.id}` });
    });

    activities.push(activity);
  });

  // Measurements
  carePlan.measurements.forEach(measurement => {
    const data = buildObservationActivityCondition('all', measurement);
    activities.push(data.activity);
    contained.push(data.goal);
  });

  // Questionnaire
  const activity = buildActivity('', 'all', 'observation');
  activity.detail.scheduledTiming = { repeat: { frequency: 1, period: 1, periodUnits: 'wk' } };
  activity.detail.extension = [{
    url: 'http://ehelse.no/fhir/vft',
    valueReference: { reference: `Questionnaire/${carePlan.questionnaireId}` },
  }];
  activities.push(activity);

  return buildCarePlanResource(
    user,
    patientId,
    category,
    goal,
    note,
    activities,
    contained);
}

export function createCarePlan(fhirUrl, patientId, type) {
  return (dispatch, getState) => {
    const { user, token, expiration } = getState().auth;
    const { authenticate } = getState().settings;

    if (authenticate && (!token || new Date().valueOf() > expiration.valueOf())) {
      return dispatch(discardAuthToken());
    }

    const carePlan = buildCarePlan(type);
    const resource = toFhirCarePlan(patientId, carePlan, user);
    const url = `${fhirUrl}/CarePlan/`;

    return post(url, resource, token)
      .then(() => {
        dispatch(fetchCarePlan(fhirUrl, patientId));
      })
      .catch(error => console.error(error));
  };
}

export function saveCarePlan(fhirUrl, patientId, carePlan) {
  return (dispatch, getState) => {
    const { data } = getState().carePlan;
    const { user, token, expiration } = getState().auth;
    const { authenticate } = getState().settings;

    if (authenticate && (!token || new Date().valueOf() > expiration.valueOf())) {
      return dispatch(discardAuthToken());
    }

    const resource = data.entry[0].resource;
    const url = `${fhirUrl}/CarePlan/${resource.id}`;
    const updatedResource = toFhirCarePlan(patientId, carePlan, user);

    return put(url, updatedResource, token)
      .then(() => {
        dispatch(completeSaveCarePlan(true));
        dispatch(fetchCarePlan(fhirUrl, patientId));
      })
      .catch(error => dispatch(completeSaveCarePlan(false, `Saving failed. ${error}`)));
  };
}
