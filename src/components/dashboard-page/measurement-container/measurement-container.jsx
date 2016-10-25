import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchObservations } from '../../../actions/observations';
import { getMeasurement } from '../../../helpers/care-plan-helpers.js';
import Measurement from './measurement/measurement.jsx';

class MeasurementsContainer extends Component {

  componentDidMount() {
    const { dispatch, fhirUrl, patientId } = this.props;
    dispatch(fetchObservations(fhirUrl, this.props.code, patientId));
  }

  render() {
    const { data, isFetching } = this.props;
    const isEmpty = data === null || data.resourceType !== 'Bundle' || data.total === 0;
    return (
      <div>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : null)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Measurement
              icon={this.props.icon}
              data={data}
              code={this.props.code}
              fromDate={this.props.fromDate}
              toDate={this.props.toDate}
              selectedDate={this.props.selectedDate}
              idealValues={this.props.idealValues}
            />
          </div>
        }
      </div>
    );
  }
}

MeasurementsContainer.propTypes = {
  fhirUrl: PropTypes.string.isRequired,
  patientId: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  data: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
  fromDate: PropTypes.instanceOf(Date).isRequired,
  toDate: PropTypes.instanceOf(Date).isRequired,
  selectedDate: PropTypes.instanceOf(Date),
  icon: PropTypes.string,
  idealValues: PropTypes.array,
};

function mapStateToProps(state, ownProps) {
  const { observationsByCode, settings, carePlan } = state;
  const {
    isFetching,
    lastUpdated,
    data,
  } = observationsByCode[ownProps.code] || {
    isFetching: true,
    data: null,
  };

  let idealValues;

  if (carePlan.data !== null
    && carePlan.data.resourceType === 'Bundle'
    && carePlan.data.total > 0) {
    const measurement = getMeasurement(carePlan.data.entry[0].resource, ownProps.code);
    idealValues = measurement.goal;
  }

  const { fhirUrl, patientId } = settings;

  return {
    fhirUrl,
    patientId,
    data,
    isFetching,
    lastUpdated,
    idealValues,
  };
}

export default connect(mapStateToProps)(MeasurementsContainer);
