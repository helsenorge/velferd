import React, { Component, PropTypes } from 'react';
import Chart from './chart/chart.jsx';
import Description from './../../description/description.jsx';
import LatestMeasurement from './../../latest-measurement/latest-measurement.jsx';
import './measurement.scss';
import ObservationCodes from '../../../../constants/observation-codes';
import { getMeasurementName, getUnit } from '../../../../helpers/observation-helpers';

class Measurements extends Component {

  getHighAndLow(code, entries) {
    if (code === ObservationCodes.pulseOximeter) {
      return { low: 70, high: 100 };
    }
    if (code === ObservationCodes.bloodPressure) {
      const values = { systolic: [], diastolic: [] };

      entries.forEach(entry => {
        entry.resource.component.filter(c => c.valueQuantity).forEach(component => {
          if (component.code.coding[0].code === ObservationCodes.bloodPressureSystolic) {
            values.systolic.push(component.valueQuantity.value);
          }
          if (component.code.coding[0].code === ObservationCodes.bloodPressureDiastolic) {
            values.diastolic.push(component.valueQuantity.value);
          }
        });
      });

      return {
        low: Math.min(...values.diastolic) - 10,
        high: Math.max(...values.systolic) + 10 };
    }

    const values = entries.map(entry => parseInt(entry.resource.valueQuantity.value, 10));
    return {
      low: Math.min(...values) - 10,
      high: Math.max(...values) + 10 };
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
    const { code, data, idealValues, fromDate, toDate, selectedDate, icon } = this.props;

    const unit = getUnit(code);
    let points = data.entry.map((item) => this.getDataPoint(item, unit));
    const name = getMeasurementName(code);
    const idealValue = this.getIdealValuesString(idealValues, unit);
    const latestValue = this.getDataPoint(data.entry[0], unit);
    const highAndLow = this.getHighAndLow(code, data.entry);

    return (
      <div className="measurement">
        <div className="measurement__chart">
          <Description
            name={name}
            unit={unit}
            idealValue={idealValue}
            icon={icon}
          />
          <Chart
            dataPoints={points}
            high={highAndLow.high}
            low={highAndLow.low}
            fromDate={fromDate}
            toDate={toDate}
            selectedDate={selectedDate}
            idealValues={idealValues}
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
