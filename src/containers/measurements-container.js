import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchObservations } from '../actions/observations';
import Measurements from '../components/measurements.jsx';

class MeasurementsContainer extends Component {

  componentDidMount() {
    const { dispatch, fhirUrl, patientId } = this.props;
    const code = '188736';
    dispatch(fetchObservations(fhirUrl, code, patientId));
  }

  render() {
    const { data, isFetching, lastUpdated } = this.props;
    const isEmpty = data === null;
    console.log(isEmpty);
    console.log(data);
    return (
      <div>
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
        </p>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Measurements data={data} />
          </div>
        }
      </div>
    );
  }
}

MeasurementsContainer.propTypes = {
  fhirUrl: PropTypes.string.isRequired,
  patientId: PropTypes.string.isRequired,
  data: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const code = '188736';

  const { observationsByCode, settings } = state;
  const {
    isFetching,
    lastUpdated,
    data,
  } = observationsByCode[code] || {
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
