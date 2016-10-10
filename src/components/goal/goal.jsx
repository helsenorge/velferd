import React, { PropTypes } from 'react';
import TextArea from '../text-area/text-area.jsx';
import classNames from 'classnames';
import './goal.scss';

const Goal = ({
    editing,
    onChange,
    patientGoal,
    saving,
    className,
  }) => {
  const getGoal = () => {
    if (editing) {
      return (
        <TextArea
          className="goal__textarea"
          onChange={onChange}
          name="patient-goal"
          value={patientGoal}
          disabled={saving}
        />
      );
    }
    return (<span>«{patientGoal}»</span>);
  };
  const classes = classNames(className, 'goal');
  return (
    <div className={classes}>
      <div className="goal__left">
        <h3 className="goal__heading">Overordnet mål</h3>
        {getGoal()}
      </div>
      <span className="goal__lastupdated">Sist oppdatert 21.11.2015</span>
    </div>
  );
};

Goal.propTypes = {
  patientGoal: PropTypes.string,
  editing: PropTypes.bool.isRequired,
  onChange: React.PropTypes.func,
  saving: React.PropTypes.bool,
  className: React.PropTypes.string,
};

export default Goal;
