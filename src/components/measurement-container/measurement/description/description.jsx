import React, { PropTypes } from 'react';
import './description.scss';

const Description = ({ name, unit, referenceValue }) => (
  <div className="measurement-description">
    <h3 className="measurement-description__heading">{name}</h3>
    <div className="measurement-description__heading">{unit}</div>
    <br />
    <div className="measurement-description__reference-heading">Pasientens idealnivå:</div>
    <div className="measurement-description__reference-value">{referenceValue}</div>
  </div>
);

Description.propTypes = {
  name: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  referenceValue: PropTypes.string.isRequired,
};

export default Description;
