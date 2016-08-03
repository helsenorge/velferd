import React, { Component, PropTypes } from 'react';

class MeasurementList extends Component {

  componentDidMount() {
  }

  formatMeasurement(point) {
    const date = new Date(point.date);
    return `${date.toLocaleDateString()}: 
      ${point.value} ${point.unit}`;
  }

  render() {
    return (
      <ul>
        {this.props.dataPoints.map((point, i) =>
          <li key={i}>
            {this.formatMeasurement(point)}
          </li>
        )}
      </ul>
    );
  }
}

MeasurementList.propTypes = {
  dataPoints: PropTypes.array.isRequired,
};

export default MeasurementList;
