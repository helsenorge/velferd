import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchObservations } from '../../../../actions/observations';
import { getMeasurement } from '../../../../helpers/care-plan-helpers.js';
import Measurement from './measurement/measurement.jsx';

class MeasurementsContainer extends Component {

  componentDidMount() {
    const { dispatch, patientId, code, fromDate, toDate } = this.props;
    dispatch(fetchObservations(code, fromDate, toDate, patientId));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.fromDate !== nextProps.fromDate || this.props.toDate !== nextProps.toDate) {
      const { dispatch, patientId, code, fromDate, toDate } = nextProps;
      dispatch(fetchObservations(code, fromDate, toDate, patientId));
    }
  }

  render() {
    const { data, isFetching, code, fromDate, toDate, icon, selectedDate, idealValues, error }
      = this.props;
    const isEmpty = data === null || data.length === 0;
    let measurement = null;

    if (error) {
      measurement = <Measurement code={code} error={error} />;
    }
    else if (isFetching) {
      measurement = <Measurement fetching code={code} code={code} />;
    }
    else if (isEmpty) {
      measurement = <Measurement empty code={code} />;
    }
    else {
      measurement = (
        <Measurement
          icon={icon}
          data={data}
          code={code}
          fromDate={fromDate}
          toDate={toDate}
          selectedDate={selectedDate}
          idealValues={idealValues}
        />);
    }
    return (
      <div>
        {measurement}
      </div>
    );
  }
}

MeasurementsContainer.propTypes = {
  patientId: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  data: PropTypes.array,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
  fromDate: PropTypes.instanceOf(Date).isRequired,
  toDate: PropTypes.instanceOf(Date).isRequired,
  selectedDate: PropTypes.instanceOf(Date),
  icon: PropTypes.string,
  idealValues: PropTypes.array,
  error: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  const { observationsByCode, carePlan, patient } = state;
  const {
    isFetching,
    lastUpdated,
    data,
    error,
  } = observationsByCode[ownProps.code] || {
    isFetching: true,
    data: [],
  };

  let idealValues;

  if (carePlan.data !== null
    && carePlan.data.resourceType === 'Bundle'
    && carePlan.data.total > 0) {
    const measurement = getMeasurement(carePlan.data.entry[0].resource, ownProps.code);
    idealValues = measurement.goal;
  }

  return {
    patientId: patient.activePatient.id,
    data,
    isFetching,
    lastUpdated,
    idealValues,
    error,
  };
}

export default connect(mapStateToProps)(MeasurementsContainer);
