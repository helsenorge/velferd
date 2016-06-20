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

  getMeasurementHigh(code) {
    switch (code) {
    case ObservationCodes.weight:
      return 120;
    case ObservationCodes.pulse:
      return 150;
    case ObservationCodes.pulseOximeter:
      return 100;
    default:
      return null;
    }
  }

  getMeasurementLow(code) {
    switch (code) {
    case ObservationCodes.weight:
      return 10;
    case ObservationCodes.pulse:
      return 50;
    case ObservationCodes.pulseOximeter:
      return 50;
    default:
      return null;
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
    points = points.slice(Math.max(points.length - 5, 1));
    const last = points[points.length - 1];
    const name = this.getMeasurementName(this.props.code);
    const high = this.getMeasurementHigh(this.props.code);
    const low = this.getMeasurementLow(this.props.code);
    return (
      <div className="measurement" >
        <span className="measurement__name">{name}</span>
        <span className="measurement__chart">
          <Chart dataPoints={points} high={high} low={low} />
        </span>
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
