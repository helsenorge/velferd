import React, { PropTypes } from 'react';
import classNames from 'classnames';
import './description.scss';

const Description = ({ name, unit, idealValue, empty, error }) => {
  let referenceMarkup;

  if (idealValue) {
    referenceMarkup = (
      <span className="measurement-description__ideal-value">
        Pasientens idealnivå: {idealValue}
      </span>
      );
  }

  let errorMarkup;
  if (error) {
    console.error(error);
    errorMarkup = (
      <span className="measurement-description__empty-text">
        Det har skjedd en teknisk feil
      </span>
      );
  }

  let emptyMarkup;
  if (empty) {
    emptyMarkup = (
      <span className="measurement-description__empty-text">
        {name === 'Egenvurdering' ? 'Det er ikke registrert noen egenvurderinger i denne perioden'
          : 'Det er ikke registrert noen målinger i denne perioden'}
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
      {errorMarkup}
      {emptyMarkup}
      {referenceMarkup}
    </div>);
};

Description.propTypes = {
  name: PropTypes.string.isRequired,
  empty: PropTypes.bool,
  unit: PropTypes.string,
  idealValue: PropTypes.string,
  error: PropTypes.object,
};

export default Description;
