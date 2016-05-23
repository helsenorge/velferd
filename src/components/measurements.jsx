import React, { Component, PropTypes } from 'react';

class Measurements extends Component {

  componentDidMount() {
  }

  formatMeasurement(measurement) {
    const date = new Date(measurement.resource.effectiveDateTime);
    return `${date.toLocaleDateString()}: 
      ${measurement.resource.valueQuantity.value} ${measurement.resource.valueQuantity.unit}`;
  }

  render() {
    return (
      <ul>
        {this.props.data.entry.map((measurement, i) =>
          <li key={i}>
            {this.formatMeasurement(measurement)}
          </li>
        )}
      </ul>
    );
  }
}

Measurements.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Measurements;
