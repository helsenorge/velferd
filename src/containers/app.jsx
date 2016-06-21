import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPatient } from '../actions/patient';
import MeasurementContainer from '../containers/measurement-container';
import QuestionnaireResponsesContainer from '../containers/questionnaire-responses-container';
import ObservationCodes from '../constants/observation-codes';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';

class App extends Component {

  componentDidMount() {
    const { dispatch, fhirUrl, patientId } = this.props;
    dispatch(fetchPatient(fhirUrl, patientId));
  }

  render() {
    const { data } = this.props;
    return (
      <div>
        <Header patient={data} />
        <h4>Pasientens egne tilbakemeldinger og målinger</h4>
        <QuestionnaireResponsesContainer questionnaireId={this.props.questionnaireId} />
        <MeasurementContainer code={ObservationCodes.bloodPressure} />
        <MeasurementContainer code={ObservationCodes.weight} />
        <MeasurementContainer code={ObservationCodes.pulse} />
        <MeasurementContainer code={ObservationCodes.pulseOximeter} />
        <Footer fhirUrl={this.props.fhirUrl} />
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
