import React, { Component, PropTypes } from 'react';
import Chart from './chart/chart.jsx';
import Description from './../../description/description.jsx';
import LatestMeasurement from './../../latest-measurement/latest-measurement.jsx';
import './measurement.scss';
import ObservationCodes from '../../../../constants/observation-codes';
import { getMeasurementName, getUnit } from '../../../../helpers/observation-helpers';

class Measurements extends Component {

  getMeasurementHigh(code) {
    switch (code) {
    case ObservationCodes.weight:
      return 100;
    case ObservationCodes.pulse:
      return 100;
    case ObservationCodes.pulseOximeter:
      return 105;
    case ObservationCodes.bloodPressure:
      return 150;
    default:
      return null;
    }
  }

  getMeasurementLow(code) {
    switch (code) {
    case ObservationCodes.weight:
      return 55;
    case ObservationCodes.pulse:
      return 50;
    case ObservationCodes.pulseOximeter:
      return 88;
    case ObservationCodes.bloodPressure:
      return 50;
    default:
      return null;
    }
  }

  getIdealValuesString(idealValues, unit) {
    if (idealValues && idealValues.length > 0) {
      if (idealValues.length === 2) {
        return `${idealValues[0].low.value}/${idealValues[1].low.value} -
      ${idealValues[0].high.value}/${idealValues[1].high.value} ${unit}`;
      }
      return `${idealValues[0].low.value} - ${idealValues[0].high.value} ${unit}`;
    }
    return '';
  }

  getDataPoint(item, unit) {
    const point = {
      date: item.resource.effectiveDateTime,
      value: [],
    };

    if (item.resource.valueQuantity) {
      point.value.push(item.resource.valueQuantity.value);
      point.unit = unit;
    }
    else {
      item.resource.component.forEach((component) => {
        if (component.valueQuantity
          && component.code.coding[0].code !== ObservationCodes.bloodPressureMean) {
          point.value.push(component.valueQuantity.value);
          point.unit = unit;
        }
      }, this);
    }
    return point;
  }

  render() {
    const { code, data, idealValues } = this.props;

    const unit = getUnit(code);
    let points = data.entry.map((item) => this.getDataPoint(item, unit));
    const name = getMeasurementName(code);
    const idealValue = this.getIdealValuesString(idealValues, unit);
    const latestValue = this.getDataPoint(data.entry[0], unit);

    return (
      <div className="measurement">
        <div className="measurement__chart">
          <Description
            name={name}
            unit={unit}
            idealValue={idealValue}
            icon={this.props.icon}
          />
          <Chart
            dataPoints={points}
            high={this.getMeasurementHigh(this.props.code)}
            low={this.getMeasurementLow(this.props.code)}
            fromDate={this.props.fromDate}
            toDate={this.props.toDate}
            selectedDate={this.props.selectedDate}
            idealValues={this.props.idealValues}
          />
        </div>
        <LatestMeasurement
          data={latestValue}
        />
      </div>
    );
  }
}

Measurements.propTypes = {
  data: PropTypes.object.isRequired,
  code: PropTypes.string.isRequired,
  fromDate: PropTypes.instanceOf(Date).isRequired,
  toDate: PropTypes.instanceOf(Date).isRequired,
  selectedDate: PropTypes.instanceOf(Date),
  icon: PropTypes.string,
  idealValues: PropTypes.array,
};

export default Measurements;
