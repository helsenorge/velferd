import React, { PropTypes } from 'react';
import classNames from 'classnames';
import TextInput from '../../../../text-input/text-input.jsx';
import { getMeasurementName, getUnit } from '../../../../../helpers/observation-helpers';
import Icon from '../../../../icon/icon.jsx';
import Button from '../../../../button/button.jsx';
import Item from './item/item.jsx';
import TransitionGroup from 'react-addons-transition-group';
import iconPlus from '../../../../../../svg/plus.svg';
import './list.scss';

const List = (
  {
    editing,
    saving,
    onChange,
    items,
    heading,
    measurements,
    addCarePlanItem,
    reasonCode,
    type,
    className,
    addButtonText,
    ...props,
  }) => {
  const getMeasurementEditControl = (label, low, high, i, j) => (
    <div className="measurement-control">
      <label className="measurement-control__label">{label}</label>
      <div className="measurement-control__inputs">
        <TextInput
          onChange={onChange}
          name={`all-measurements-${i}-${j}-low`}
          value={low}
          className="measurement-control__input"
          disabled={saving}
        />
        –
        <TextInput
          onChange={onChange}
          name={`all-measurements-${i}-${j}-high`}
          value={high}
          className="measurement-control__input"
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

      if (editing) {
        const label1 = `Idealnivå ${getMeasurementName(range1.code)} (${unit})`;
        const label2 = `Idealnivå ${getMeasurementName(range2.code)} (${unit})`;
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

    if (editing) {
      const label = `Idealnivå ${name} (${unit})`;
      return getMeasurementEditControl(label, range.low.value, range.high.value, i, 0);
    }

    return (<span><b>{name}:</b> {range.low.value}-{range.high.value} {unit}</span>);
  };

  const measurementsList = measurements !== undefined ? measurements : [];
  const headerClass = classNames('care-plan__listheading', className);
  const elements = items.map((item, i) =>
    <Item
      key={item.id}
      i={i}
      id={item.id}
      value={item.text}
      type={type}
      editing={editing}
      reasonCode={reasonCode}
      saving={saving}
      onChange={onChange}
      last={i === items.length - 1}
      {...props}
    />);

  return (
    <div className="care-plan__list">
      <h3 className={headerClass}>{heading}</h3>
      <TransitionGroup
        transitionEnterTimeout={400}
        transitionLeaveTimeout={400}
        component="ul"
        className="care-plan__listitems"
      >
        {elements}
      </TransitionGroup>
        {editing ? (
          <Button
            square
            className="care-plan__addbutton"
            onClick={() => addCarePlanItem(reasonCode, type)}
          >
            <div className="care-plan__buttonwrap">
              <div>Legg til {addButtonText}</div>
              <Icon className="care-plan__add-icon" glyph={iconPlus} />
            </div>
          </Button>
          ) : null}
      <ul className="care-plan__listitems">
        {measurementsList.map((item, i) => <li key={i}>{getMeasurementItem(i, item)}</li>)}
      </ul>
    </div>
    );
};

export default List;

List.propTypes = {
  editing: PropTypes.bool.isRequired,
  heading: PropTypes.string.isRequired,
  className: PropTypes.string,
  items: PropTypes.array.isRequired,
  measurements: PropTypes.array,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool.isRequired,
  addCarePlanItem: React.PropTypes.func.isRequired,
  reasonCode: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  addButtonText: React.PropTypes.string.isRequired,
};
