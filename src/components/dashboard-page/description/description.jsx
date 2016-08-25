import React, { PropTypes } from 'react';
import './description.scss';

const Description = ({ name, unit, referenceValue }) => {
  let referenceMarkup;

  if (referenceValue) {
    referenceMarkup = (
      <span className="measurement-description__reference-value">
        Pasientens idealnivå: {referenceValue}
      </span>
      );
  }
  else {
    referenceMarkup = null;
  }


  return (
    <div className="measurement-description">
      <h3 className="measurement-description__heading">{name} {unit ? `(${unit})` : null}</h3>
      {referenceMarkup}
    </div>);
};

Description.propTypes = {
  name: PropTypes.string.isRequired,
  unit: PropTypes.string,
  referenceValue: PropTypes.string,
};

export default Description;
