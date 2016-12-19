import { expect } from 'chai';
import { getPhase, getPatientGoal, getQuestionnaireId,
  getMeasurement, getMeasurements, getCategory, getAuthor,
  getLastUpdated, phaseToText, carePlanToText, getCarePlan } from './care-plan-helpers.js';
import CarePlanCategories from '../constants/care-plan-categories';
import data from '../mock/care-plan.json';

describe('careplan phase', () => {
  it('should have a reason code', () => {
    const phase = getPhase(data, 'green');
    expect(phase.reasonCode).to.equal('green');
  });

  it('should have a list of symptoms', () => {
    const phase = getPhase(data, 'green');
    expect(phase.symptoms).to.not.equal(undefined);
    expect(phase.symptoms.length).equal(5);
  });

  it('should have a list of actions', () => {
    const phase = getPhase(data, 'green');
    expect(phase.actions).to.not.equal(undefined);
    expect(phase.actions.length).gt(0);
  });

  it('should have a list of medications', () => {
    const phase = getPhase(data, 'green');
    expect(phase.medications).to.not.equal(undefined);
    expect(phase.medications.length).gt(0);
  });

  it('text representation should have symptoms', () => {
    const phase = getPhase(data, 'green');
    const text = phaseToText(phase);
    expect(text.indexOf('- Ingen tungpust')).to.not.equal(-1);
  });

  it('text representation should have actions', () => {
    const phase = getPhase(data, 'green');
    const text = phaseToText(phase);
    expect(text.indexOf('* Hold deg i aktivitet')).to.not.equal(-1);
  });

  it('text representation should have medications', () => {
    const phase = getPhase(data, 'green');
    const text = phaseToText(phase);
    expect(text.indexOf('# Vanndrivende: Burinex, 2mg, 1 gang daglig')).to.not.equal(-1);
  });
});

describe('careplan', () => {
  it('should have a goal', () => {
    const goal = getPatientGoal(data);
    expect(goal).to.not.equal(undefined);
  });

  it('should have a questionnaire', () => {
    const id = getQuestionnaireId(data);
    expect(id).to.equal('62763');
  });

  it('should have a measurement', () => {
    const measurement = getMeasurement(data, '188736');
    expect(measurement).to.not.equal(undefined);
  });

  it('should have a list of measurements', () => {
    const measurements = getMeasurements(data);
    expect(measurements).to.not.equal(undefined);
    expect(measurements.length).equal(4);
  });

  it('should have a category', () => {
    const category = getCategory(data);
    expect(category).to.equal(CarePlanCategories.HeartFailure);
  });

  it('should have an author', () => {
    const author = getAuthor(data);
    expect(author).to.not.equal(undefined);
  });

  it('should have the date it was last updated', () => {
    const lastUpdated = getLastUpdated(data);
    expect(lastUpdated).to.not.equal(undefined);
  });

  it('text representation should have phases', () => {
    const text = carePlanToText(getCarePlan(data));
    expect(text.indexOf('GRØNN – Stabil')).to.not.equal(-1);
    expect(text.indexOf('GUL - Moderat forverring')).to.not.equal(-1);
    expect(text.indexOf('RØD - Alvorlig forverring')).to.not.equal(-1);
  });

  it('text representation should have measurements', () => {
    const text = carePlanToText(getCarePlan(data));
    expect(text.indexOf('Vekt: 75-77 kg')).to.not.equal(-1);
    expect(text.indexOf('Puls: 60-80 bpm')).to.not.equal(-1);
  });
});
