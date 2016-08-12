import React, { PropTypes } from 'react';
import './description.scss';

const Description = ({ name, unit, referenceValue }) => (
  <div className="measurement-description">
    <div>
      <h3 className="measurement-description__heading">{name}</h3>
      <span className="measurement-description__heading">{unit}</span>
    </div>
    <div>
      <h4 className="measurement-description__reference-heading">Pasientens idealnivå:</h4>
      <span className="measurement-description__reference-value">{referenceValue}</span>
    </div>
  </div>
);

Description.propTypes = {
  name: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  referenceValue: PropTypes.string.isRequired,
};

export default Description;
