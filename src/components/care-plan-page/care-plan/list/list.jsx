import React, { PropTypes } from 'react';
import classNames from 'classnames';
import TextInput from '../../../text-input/text-input.jsx';
import { getMeasurementName, getUnit } from '../../../../helpers/observation-helpers';

const List = (
  {
    edit,
    saving,
    onChange,
    items,
    heading,
    measurements,
    deleteCarePlanItem,
    addCarePlanItem,
    reasonCode,
    type,
    className,
  }) => {
  const getValue = (i, value) => {
    if (edit) {
      const name = `${reasonCode}-${type}-${i}`;
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
  const getMeasurementDisplayValue = (measurement) => {
    const name = getMeasurementName(measurement.code);
    const unit = getUnit(measurement.code);

    if (measurement.goal.length > 1) {
      const valueRange1 = measurement.goal[0].extension[1].valueRange;
      const valueRange2 = measurement.goal[1].extension[1].valueRange;
      return (<span><b>{name}:</b> {valueRange1.low.value}/{valueRange2.low.value} -
      {valueRange1.high.value}/{valueRange2.high.value} {unit}</span>);
    }

    const valueRange = measurement.goal[0].extension[1].valueRange;
    return (<span><b>{name}:</b> {valueRange.low.value}-{valueRange.high.value} {unit}</span>);
  };

  const measurementsList = measurements !== undefined ? measurements : [];
  const headerClass = classNames('care-plan__listheading', className);
  return (
    <div className="care-plan__list">
      <h3 className={headerClass}>{heading}</h3>
      <ul className="care-plan__listitems">
        {items.map((item, i) => <li>{getValue(i, item)}</li>)}
        {measurementsList.map((item) => <li>{getMeasurementDisplayValue(item)}</li>)}
      </ul>
      {edit ? (
        <button onClick={() => addCarePlanItem(reasonCode, type)}>Legg til element</button>
        ) : null}
    </div>
    );
};

export default List;

List.propTypes = {
  edit: PropTypes.bool.isRequired,
  heading: PropTypes.string.isRequired,
  className: PropTypes.string,
  items: PropTypes.array.isRequired,
  measurements: PropTypes.array,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool.isRequired,
  deleteCarePlanItem: React.PropTypes.func.isRequired,
  addCarePlanItem: React.PropTypes.func.isRequired,
  reasonCode: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
};
