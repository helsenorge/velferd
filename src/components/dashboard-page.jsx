import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MeasurementContainer from '../containers/measurement-container';
import QuestionnaireResponsesContainer from '../containers/questionnaire-responses-container';
import ObservationCodes from '../constants/observation-codes';

class App extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <h4>Pasientens egne tilbakemeldinger og målinger</h4>
        <QuestionnaireResponsesContainer questionnaireId={this.props.questionnaireId} />
        <MeasurementContainer code={ObservationCodes.bloodPressure} />
        <MeasurementContainer code={ObservationCodes.weight} />
        <MeasurementContainer code={ObservationCodes.pulse} />
        <MeasurementContainer code={ObservationCodes.pulseOximeter} />
      </div>
    );
  }
}

App.propTypes = {
  questionnaireId: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  const { settings } = state;
  const { questionnaireId } = settings;

  return {
    questionnaireId,
  };
}

export default connect(
  mapStateToProps,
)(App);
