import React, { PropTypes } from 'react';
import List from './list/list.jsx';
import './phase.scss';

const Phase = ({ name, symptoms, actions, medications }) => (
  <div>
    <div>
      <h3>{name}</h3>
    </div>
    <div>
      <List heading="Symptomer" values={symptoms} />
      <List heading="Hva gjør du?" values={actions} />
      <List heading="Medikamentell Behandling" values={medications} />
    </div>
  </div>
);

Phase.propTypes = {
  name: PropTypes.string.isRequired,
  symptoms: PropTypes.array.isRequired,
  actions: PropTypes.array.isRequired,
  medications: PropTypes.array.isRequired,
};

export default Phase;
