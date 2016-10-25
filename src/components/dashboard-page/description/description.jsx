import React, { PropTypes } from 'react';
import './description.scss';

const Description = ({ name, unit, idealValue }) => {
  let referenceMarkup;

  if (idealValue) {
    referenceMarkup = (
      <span className="measurement-description__ideal-value">
        Pasientens idealnivå: {idealValue}
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
  idealValue: PropTypes.string,
};

export default Description;
