import React, { PropTypes } from 'react';
import './goal.scss';

const Goal = (props) => (
  <div className="goal">
    <div className="goal__left">
      <h3 className="goal__heading">Overordnet mål</h3>
      <span>"{props.patientGoal}"</span>
    </div>
    <span>Sist oppdatert 21.11.2015</span>
  </div>
);

Goal.propTypes = {
  patientGoal: PropTypes.string,
  edit: PropTypes.bool.isRequired,
};

export default Goal;
