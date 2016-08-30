import { expect } from 'chai';
import { getPhase } from './care-plan.js';
import data from '../../mock/care-plan.json';

describe('careplan phase', () => {
  it('should have a name', () => {
    const phase = getPhase(data, 'green');
    expect(phase.name).to.equal('green');
  });

  it('should have a list of symptoms', () => {
    const phase = getPhase(data, 'green');
    expect(phase.symptoms).to.not.equal(undefined);
    expect(phase.symptoms.length).gt(0);
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
});
