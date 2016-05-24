import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchObservations } from '../actions/observations';
import Measurements from '../components/measurements.jsx';
import ObservationCodes from '../constants/observation-codes';

class MeasurementsContainer extends Component {

  componentDidMount() {
    const { dispatch, fhirUrl, patientId } = this.props;
    dispatch(fetchObservations(fhirUrl, this.props.code, patientId));
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

  render() {
    const { data, isFetching, lastUpdated } = this.props;
    const isEmpty = data === null;
    const name = this.getMeasurementName(this.props.code);
    return (
      <div>
        <h3>{name}</h3>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Measurements data={data} />
          </div>
        }
        <small>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
        </small>
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
};

function mapStateToProps(state, ownProps) {
  const { observationsByCode, settings } = state;
  const {
    isFetching,
    lastUpdated,
    data,
  } = observationsByCode[ownProps.code] || {
    isFetching: true,
    data: null,
  };

  const { fhirUrl, patientId } = settings;

  return {
    fhirUrl,
    patientId,
    data,
    isFetching,
    lastUpdated,
  };
}

export default connect(mapStateToProps)(MeasurementsContainer);
