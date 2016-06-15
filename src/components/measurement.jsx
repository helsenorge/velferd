import React, { Component, PropTypes } from 'react';
import Chart from '../components/chart.jsx';
import './measurement.scss';
import ObservationCodes from '../constants/observation-codes';

class Measurements extends Component {

  componentDidMount() {
  }

  getMeasurementName(code) {
    switch (code) {
    case ObservationCodes.weight:
      return 'Weight';
    case ObservationCodes.pulse:
      return 'Pulse';
    case ObservationCodes.pulseOximeter:
      return 'Pulse Oximeter';
    default:
      return '';
    }
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
    let points = this.props.data.entry.map(this.getDataPoint);
    points = points.slice(Math.max(points.length - 4, 1));
    const last = points.pop();
    const name = this.getMeasurementName(this.props.code);
    return (
      <div className="measurement" >
        <span className="measurement__name">{name}</span>
        <span className="measurement__chart"><Chart dataPoints={points} /></span>
        <span className="measurement__lastValue">{`${last.value} ${last.unit}`}</span>
      </div>
    );
  }
}

Measurements.propTypes = {
  data: PropTypes.object.isRequired,
  code: PropTypes.string.isRequired,
};

export default Measurements;
