import React, { PropTypes } from 'react';
import classNames from 'classnames';
import './description.scss';

const Description = ({ name, unit, idealValue, empty }) => {
  let referenceMarkup;

  if (idealValue) {
    referenceMarkup = (
      <span className="measurement-description__ideal-value">
        Pasientens idealnivå: {idealValue}
      </span>
      );
  }

  let emptyMarkup;
  if (empty) {
    emptyMarkup = (
      <span className="measurement-description__empty-text">
        {name === 'Egenvurdering' ? 'Det er ikke registrert noen egenvurderinger'
          : 'Det er ikke registrert noen målinger'}
      </span>
      );
  }

  const className = classNames({
    'measurement-description': true,
    'measurement-description--empty': empty,
  });

  return (
    <div className={className}>
      <h3 className="measurement-description__heading">{name} {unit ? `(${unit})` : null}</h3>
      {emptyMarkup}
      {referenceMarkup}
    </div>);
};

Description.propTypes = {
  name: PropTypes.string.isRequired,
  empty: PropTypes.bool,
  unit: PropTypes.string,
  idealValue: PropTypes.string,
};

export default Description;
