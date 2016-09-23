import React, { PropTypes } from 'react';
import TextInput from '../../../text-input/text-input.jsx';
import { getMeasurementName, getUnit } from '../../../../helpers/observation-helpers';

const List = ({ edit, saving, onChange, items, heading, measurements }) => {
  const getValue = (i, value) => {
    if (edit) {
      return (
        <TextInput
          onChange={onChange}
          name="a"
          value={value}
          disabled={saving}
        />
      );
    }
    return value;
  };
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

  const measurementsList = measurements !== undefined ? measurements : [];

  return (
    <div className="care-plan__list">
      <h3 className="care-plan__listheading">{heading}</h3>
      <ul className="care-plan__listitems">
        {items.map((item, i) => <li>{getValue(i, item)}</li>)}
        {measurementsList.map((item) => <li>{getMeasurementDisplayValue(item)}</li>)}
      </ul>
    </div>
    );
};

export default List;

List.propTypes = {
  edit: PropTypes.bool.isRequired,
  heading: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  measurements: PropTypes.array,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool.isRequired,
};
