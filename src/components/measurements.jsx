import React, { Component, PropTypes } from 'react';
import Chart from '../components/chart.jsx';

class Measurements extends Component {

  componentDidMount() {
  }

  getDataPoint(item) {
    const point = {
      date: item.resource.effectiveDateTime,
      value: item.resource.valueQuantity.value,
      unit: item.resource.valueQuantity.unit,
    };
    return point;
  }

  render() {
    const points = this.props.data.entry.map(this.getDataPoint);
    return (
      <div>
        <Chart dataPoints={points} />
      </div>
    );
  }
}

Measurements.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Measurements;
