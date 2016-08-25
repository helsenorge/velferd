import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Summary from './summary/summary.jsx';
import { getMeasurementName } from '../../../helpers/observation-helpers';
import { filterObservations } from '../../../helpers/date-helpers';
import ObservationCodes from '../../../constants/observation-codes';

const SummaryContainer = function SummaryContainer(props) {
  return (<Summary date={props.date} measurements={props.measurements} />);
};

SummaryContainer.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  codes: PropTypes.array.isRequired,
  measurements: PropTypes.array.isRequired,
};

function getValue(item) {
  let value = '';
  if (item.resource.valueQuantity) {
    value = `${item.resource.valueQuantity.value} ${item.resource.valueQuantity.unit}`;
  }
  else {
    item.resource.component.forEach((component) => {
      if (component.valueQuantity
        && component.code.coding[0].code !== ObservationCodes.bloodPressureMean) {
        if (value !== '') value = value.concat(' / ');
        value = value.concat(component.valueQuantity.value);
      }
    }, this);
  }
  value = value.concat(`, ${new Date(item.resource.effectiveDateTime).toLocaleTimeString()}`);
  return value;
}

function mapStateToProps(state, ownProps) {
  const { observationsByCode } = state;
  const measurements = [];

  for (let i = 0; i < ownProps.codes.length; i++) {
    const code = ownProps.codes[i];
    const observations = observationsByCode[code];

    if (observations && observations.data) {
      const entries = filterObservations(observations.data.entry, ownProps.date);
      const data = {
        name: getMeasurementName(code),
        values: entries.map(getValue),
      };
      measurements.push(data);
    }
  }

  return {
    measurements,
  };
}

export default connect(mapStateToProps)(SummaryContainer);
