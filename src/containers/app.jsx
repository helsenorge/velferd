import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPatient } from '../actions/patient';
import MeasurementContainer from '../containers/measurement-container';
import ObservationCodes from '../constants/observation-codes';
import Header from '../components/header.jsx';
import { fetchQuestionnaireResponses } from '../actions/questionnaire-responses';

class App extends Component {

  componentDidMount() {
    const { dispatch, fhirUrl, patientId, questionnaireId } = this.props;
    dispatch(fetchPatient(fhirUrl, patientId));
    dispatch(fetchQuestionnaireResponses(fhirUrl, patientId, questionnaireId));
  }

  render() {
    const { data } = this.props;
    return (
      <div>
        <Header patient={data} fhirUrl={this.props.fhirUrl} />
        <MeasurementContainer code={ObservationCodes.weight} />
        <MeasurementContainer code={ObservationCodes.pulse} />
        <MeasurementContainer code={ObservationCodes.pulseOximeter} />
      </div>
    );
  }
}

App.propTypes = {
  fhirUrl: PropTypes.string.isRequired,
  patientId: PropTypes.string.isRequired,
  questionnaireId: PropTypes.string.isRequired,
  data: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { patient, settings } = state;
  const {
    isFetching,
    data,
  } = patient || {
    isFetching: true,
    data: null,
  };

  const { fhirUrl, patientId, questionnaireId } = settings;

  return {
    fhirUrl,
    patientId,
    questionnaireId,
    data,
    isFetching,
  };
}

export default connect(
  mapStateToProps,
)(App);
