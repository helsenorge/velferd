import React, { PropTypes } from 'react';
import './description.scss';

const Description = ({ name, unit, referenceValue }) => {
  let referenceMarkup;
  let unitMarkup;

  if (referenceValue) {
    referenceMarkup = (
      <div>
        <h4 className="measurement-description__reference-heading">Pasientens idealnivå:</h4>
        <span className="measurement-description__reference-value">{referenceValue}</span>
      </div>
      );
  }

  if (unit) {
    unitMarkup = (
      <span className="measurement-description__heading">{unit}</span>
      );
  }

  return (
    <div className="measurement-description">
      <div>
        <h3 className="measurement-description__heading">{name}</h3>
        {unitMarkup}
      </div>
      {referenceMarkup}
    </div>);
};

Description.propTypes = {
  name: PropTypes.string.isRequired,
  unit: PropTypes.string,
  referenceValue: PropTypes.string,
};

export default Description;
