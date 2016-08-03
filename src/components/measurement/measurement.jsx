import React, { Component, PropTypes } from 'react';
import Chart from '../chart/chart.jsx';
import './measurement.scss';
import ObservationCodes from '../../constants/observation-codes';
import { formatDate, filterPointsSince } from '../date-helpers/date-helpers.js';

class Measurements extends Component {

  getMeasurementName(code) {
    switch (code) {
    case ObservationCodes.weight:
      return 'Weight';
    case ObservationCodes.pulse:
      return 'Pulse';
    case ObservationCodes.pulseOximeter:
      return 'Pulse Oximeter';
    case ObservationCodes.bloodPressure:
      return 'Blood Pressure';
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
    case ObservationCodes.bloodPressure:
      return 150;
    default:
      return null;
    }
  }

  getMeasurementLow(code) {
    switch (code) {
    case ObservationCodes.weight:
      return 40;
    case ObservationCodes.pulse:
      return 50;
    case ObservationCodes.pulseOximeter:
      return 80;
    case ObservationCodes.bloodPressure:
      return 50;
    default:
      return null;
    }
  }

  getDataPoint(item) {
    const point = {
      date: item.resource.effectiveDateTime,
      value: [],
    };

    if (item.resource.valueQuantity) {
      point.value.push(item.resource.valueQuantity.value);
      point.unit = item.resource.valueQuantity.unit;
    }
    else {
      item.resource.component.forEach((component) => {
        if (component.valueQuantity
          && component.code.coding[0].code !== ObservationCodes.bloodPressureMean) {
          point.value.push(component.valueQuantity.value);
          point.unit = component.valueQuantity.unit;
        }
      }, this);
    }
    return point;
  }

  render() {
    let points = this.props.data.entry.map(this.getDataPoint);
    points = filterPointsSince(points, this.props.daysToShow);
    const name = this.getMeasurementName(this.props.code);
    let chart;

    if (points.length > 0) {
      chart = (
        <Chart
          dataPoints={points}
          high={this.getMeasurementHigh(this.props.code)}
          low={this.getMeasurementLow(this.props.code)}
        />);
    }

    let lastValueSection;
    if (points.length > 0) {
      const last = points[points.length - 1];
      const lastDate = formatDate(last.date);
      const lastValue = last.value.length > 1 ? last.value.join('/') : last.value;
      lastValueSection = (
        <span className="measurement__lastValue">
          <div>{lastDate}</div>
          <div className="measurement__lastValue__value">{`${lastValue} ${last.unit}`}</div>
        </span>
      );
    }

    return (
      <div className="measurement" >
        <span className="measurement__name">{name}</span>
        <span className="measurement__chart">
          {chart}
        </span>
        {lastValueSection}
      </div>
    );
  }
}

Measurements.propTypes = {
  data: PropTypes.object.isRequired,
  code: PropTypes.string.isRequired,
  daysToShow: PropTypes.number.isRequired,
};

export default Measurements;
