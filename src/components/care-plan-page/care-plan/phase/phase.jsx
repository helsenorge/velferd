import React, { PropTypes } from 'react';
import Icon from '../../../icon/icon.jsx';
import TextInput from '../../../text-input/text-input.jsx';
import { getMeasurementName, getUnit } from '../../../../helpers/observation-helpers';

import './phase.scss';

const Phase = (
  { edit, name, phase, glyph, onChange, saving, deleteCarePlanItem, addCarePlanItem }) => {
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
      const name = `${phase.reasonCode}-${type}-${i}`;
      return (
        <div>
          <TextInput
            onChange={onChange}
            name={name}
            value={value}
            disabled={saving}
          />
          <button onClick={() => deleteCarePlanItem(name)}>Delete</button>
        </div>
      );
    }
    return value;
  };

  const getRows = () => {
    const numRows = Math.max(phase.symptoms.length, phase.actions.length, phase.medications.length);
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push((
        <tr className="care-plan-table__row">
          <td className="care-plan-table__cell">
            {phase.symptoms[i] !== undefined ?
              (<span className="care-plan-table__celltext">
                {getValue(i, 'symptoms', phase.symptoms[i])}
              </span>)
              : null
            }
          </td>
          <td className="care-plan-table__cell">
            {phase.actions[i] !== undefined ?
              (<span className="care-plan-table__celltext">
                {getValue(i, 'actions', phase.actions[i])}
              </span>)
              : null
            }
          </td>
          <td className="care-plan-table__cell">
            {phase.medications[i] !== undefined ?
              (<span className="care-plan-table__celltext">
                {getValue(i, 'medications', phase.medications[i])}
              </span>)
              : null
            }
          </td>
        </tr>
        ));
    }

    for (let i = 0; i < phase.measurements.length; i++) {
      rows.push((
        <tr className="care-plan-table__row">
          <td className="care-plan-table__cell">
            <span className="care-plan-table__celltext">
              {getMeasurementDisplayValue(phase.measurements[i])}
            </span>
          </td>
          <td className="care-plan-table__cell"></td>
          <td className="care-plan-table__cell"></td>
        </tr>
        ));
    }

    if (edit) {
      rows.push((
        <tr className="care-plan-table__row">
          <td className="care-plan-table__cell">
            <button onClick={() => addCarePlanItem(phase.reasonCode, 'symptoms')}>
              Legg til symptom
            </button>
          </td>
          <td className="care-plan-table__cell">
            <button onClick={() => addCarePlanItem(phase.reasonCode, 'actions')}>
              Legg til tiltak
            </button>
          </td>
          <td className="care-plan-table__cell">
            <button onClick={() => addCarePlanItem(phase.reasonCode, 'medications')}>
              Legg til medisinering
            </button>
          </td>
        </tr>
      ));
    }

    return rows;
  };

  let rows = getRows();
  return (
    <table className="care-plan-table">
      <caption className="care-plan-table__caption">
        <Icon className="care-plan-table__icon" glyph={glyph} />
        {name}
      </caption>
      <thead>
        <tr>
          <th scope="col" className="care-plan-table__header">
            Symptomer
          </th>
          <th scope="col" className="care-plan-table__header">
            Hva gjør du
          </th>
          <th scope="col" className="care-plan-table__header">
            Medikamentell Behandling
          </th>
        </tr>
      </thead>
      <tbody className="care-plan-table__body">
        {rows}
      </tbody>
    </table>
  );
};

Phase.propTypes = {
  edit: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  phase: PropTypes.object.isRequired,
  glyph: PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool.isRequired,
  deleteCarePlanItem: React.PropTypes.func.isRequired,
  addCarePlanItem: React.PropTypes.func.isRequired,
};

export default Phase;
