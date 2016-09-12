import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchObservations } from '../../../actions/observations';
import Measurement from './measurement/measurement.jsx';

class MeasurementsContainer extends Component {

  componentDidMount() {
    const { dispatch, fhirUrl, patientId, token } = this.props;
    dispatch(fetchObservations(fhirUrl, this.props.code, patientId, token));
  }

  render() {
    const { data, isFetching } = this.props;
    const isEmpty = data === null;
    return (
      <div>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Measurement
              icon={this.props.icon}
              data={data}
              code={this.props.code}
              fromDate={this.props.fromDate}
              toDate={this.props.toDate}
              selectedDate={this.props.selectedDate}
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
  fromDate: React.PropTypes.instanceOf(Date).isRequired,
  toDate: React.PropTypes.instanceOf(Date).isRequired,
  selectedDate: React.PropTypes.instanceOf(Date),
  icon: React.PropTypes.string,
  token: React.PropTypes.string,
};

function mapStateToProps(state, ownProps) {
  const { observationsByCode, settings, auth } = state;
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
    token: auth.token,
  };
}

export default connect(mapStateToProps)(MeasurementsContainer);
