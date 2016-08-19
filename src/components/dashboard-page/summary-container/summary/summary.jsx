import React, { PropTypes } from 'react';

const Summary = function Summary(props) {
  const date = props.date.toLocaleDateString();

  return (
    <div>
      <div>Dato: {date}</div>
      <ul>
        {props.measurements.map((measurement, i) =>
          <li>
            {measurement.name}
            <ul>
              {measurement.values.map((value, i) =>
                <li key={i}>{value}</li>
              )}
            </ul>
          </li>
        )}
      </ul>
    </div>
    );
};

Summary.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  measurements: PropTypes.array.isRequired,
};

export default Summary;
