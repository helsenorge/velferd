import React, { PropTypes } from 'react';
import './description.scss';
import Icon from '../../icon/icon.jsx';

const Description = ({ name, unit, referenceValue, icon }) => {
  let referenceMarkup;
  let unitMarkup;
  let iconMarkup;

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

  if (icon) {
    iconMarkup = (
      <Icon glyph={icon} className="measurement-description__icon" />
      );
  }

  return (
    <div className="measurement-description">
      <div>
        <h3 className="measurement-description__heading">{name}</h3>
        {unitMarkup}
      </div>
      {iconMarkup}
      {referenceMarkup}
    </div>);
};

Description.propTypes = {
  name: PropTypes.string.isRequired,
  unit: PropTypes.string,
  referenceValue: PropTypes.string,
  icon: PropTypes.string,
};

export default Description;
