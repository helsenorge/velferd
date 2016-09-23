import React, { PropTypes } from 'react';
import Icon from '../../../icon/icon.jsx';
import TextInput from '../../../text-input/text-input.jsx';
import { getMeasurementName, getUnit } from '../../../../helpers/observation-helpers';

import './phase.scss';

const Phase = ({ edit, name, phase, glyph, onChange, saving }) => {
  const getMeasurementDisplayValue = (measurement) => {
    const name = getMeasurementName(measurement.code);
    const unit = getUnit(measurement.code);

    if (measurement.goal.length > 1) {
      const valueRange1 = measurement.goal[0].extension[1].valueRange;
      const valueRange2 = measurement.goal[1].extension[1].valueRange;
      return `${name}: ${valueRange1.low.value}/${valueRange2.low.value} -
      ${valueRange1.high.value}/${valueRange2.high.value} ${unit}`;
    }

    const valueRange = measurement.goal[0].extension[1].valueRange;
    return `${name}: ${valueRange.low.value}-${valueRange.high.value} ${unit}`;
  };

  const getValue = (i, type, value) => {
    if (edit) {
      return (
        <TextInput
          onChange={onChange}
          name={`${phase.reasonCode}-${type}-${i}`}
          value={value}
          disabled={saving}
        />
      );
    }
    return value;
  };

  const symptoms = phase.symptoms.map((el, i) =>
    <li>{getValue(i, 'symptoms', phase.symptoms[i])}</li>
  );

  const measurements = phase.measurements.map((el) =>
    <li>{getMeasurementDisplayValue(el)}</li>
  );

  const actions = phase.actions.map((el, i) =>
    <li>{getValue(i, 'actions', phase.actions[i])}</li>
  );

  const medications = phase.medications.map((el, i) =>
    <li>{getValue(i, 'medications', phase.medications[i])}</li>
  );

  return (
    <div className="care-plan-phase">
      <div className="care-plan-phase__header">
        <Icon className="care-plan-phase__icon" glyph={glyph} />
        <h3>{name}</h3>
      </div>
      <div className="care-plan-phase__content">
        <h4>Symptomer</h4>
        <ul className="care-plan-phase__list">
          {symptoms}
          {measurements}
        </ul>
        <h4>Hva gjør du</h4>
        <ul className="care-plan-phase__list">
          {actions}
        </ul>
        <h5>Medisiner</h5>
        <ul className="care-plan-phase__list">
          {medications}
        </ul>
      </div>
    </div>
  );
};

Phase.propTypes = {
  edit: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  phase: PropTypes.object.isRequired,
  glyph: PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool.isRequired,
};

export default Phase;
