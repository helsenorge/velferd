import { expect } from 'chai';
import { getBirthNumber, getName } from './patient-helpers.js';
import data from '../mock/patient.json';

describe('patient', () => {
  it('should have a birth number', () => {
    const number = getBirthNumber(data);
    expect(number).to.equal('11111122222');
  });

  it('should have a name', () => {
    const name = getName(data);
    expect(name).to.equal('Lars, Roland');
  });
});
