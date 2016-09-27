import React, { PropTypes } from 'react';
import classNames from 'classnames';
import TextInput from '../../../text-input/text-input.jsx';
import { getMeasurementName, getUnit } from '../../../../helpers/observation-helpers';
import Icon from '../../../icon/icon.jsx';
import Item from './item/item.jsx';
import iconPlus from '../../../../../svg/plus.svg';
import './list.scss';

const List = (
  {
    edit,
    saving,
    onChange,
    items,
    heading,
    measurements,
    addCarePlanItem,
    reasonCode,
    type,
    deleteCarePlanItem,
    className,
    addButtonText,
  }) => {
  const getMeasurementEditControl = (label, low, high, i, j) => (
    <div className="measurement-control">
      <label className="measurement-control__label">{label}</label>
      <div className="measurement-control__inputs">
        <TextInput
          onChange={onChange}
          name={`${reasonCode}-measurements-${i}-${j}-low`}
          value={low}
          disabled={saving}
        />
        –
        <TextInput
          onChange={onChange}
          name={`${reasonCode}-measurements-${i}-${j}-high`}
          value={high}
          disabled={saving}
        />
      </div>
    </div>
    );

  const getMeasurementItem = (i, measurement) => {
    const name = getMeasurementName(measurement.code);
    const unit = getUnit(measurement.code);

    if (measurement.goal.length === 2) {
      const range1 = measurement.goal[0];
      const range2 = measurement.goal[1];

      if (edit) {
        const label1 = `Ideel ${getMeasurementName(range1.code)} ${name} (${unit})`;
        const label2 = `Ideel ${getMeasurementName(range2.code)} ${name} (${unit})`;
        return (
          <div>
            {getMeasurementEditControl(label1, range1.low.value, range1.high.value, i, 0)}
            {getMeasurementEditControl(label2, range2.low.value, range2.high.value, i, 1)}
          </div>
        );
      }

      return (<span><b>{name}:</b> {range1.low.value}/{range2.low.value} -
      {range1.high.value}/{range2.high.value} {unit}</span>);
    }

    const range = measurement.goal[0];

    if (edit) {
      const label = `Ideel ${name} (${unit})`;
      return getMeasurementEditControl(label, range.low.value, range.high.value, i, 0);
    }

    return (<span><b>{name}:</b> {range.low.value}-{range.high.value} {unit}</span>);
  };

  const measurementsList = measurements !== undefined ? measurements : [];
  const headerClass = classNames('care-plan__listheading', className);
  return (
    <div className="care-plan__list">
      <h3 className={headerClass}>{heading}</h3>
      <ul className="care-plan__listitems">
        {items.map((item, i) =>
          <li key={i}>
            <Item
              i={i}
              value={item}
              deleteCarePlanItem={deleteCarePlanItem}
              type={type}
              edit={edit}
              reasonCode={reasonCode}
              saving={saving}
              onChange={onChange}
            />
          </li>)}
        {edit ? (
          <button
            className="care-plan__addbutton"
            onClick={() => addCarePlanItem(reasonCode, type)}
          >
            Legg til {addButtonText}
            <Icon className="care-plan__add-icon" glyph={iconPlus} />
          </button>
          ) : null}
        {measurementsList.map((item, i) => <li key={i}>{getMeasurementItem(i, item)}</li>)}
      </ul>
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
  addButtonText: React.PropTypes.string.isRequired,
};
