import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MeasurementContainer from '../containers/measurement-container';
import QuestionnaireResponsesContainer from '../containers/questionnaire-responses-container';
import ObservationCodes from '../constants/observation-codes';

class DashboardPage extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <h4>Pasientens egne tilbakemeldinger og målinger</h4>
        <QuestionnaireResponsesContainer questionnaireId={this.props.questionnaireId} />
        <MeasurementContainer showLastValue code={ObservationCodes.bloodPressure} />
        <MeasurementContainer showLastValue code={ObservationCodes.weight} />
        <MeasurementContainer showLastValue code={ObservationCodes.pulse} />
        <MeasurementContainer showLastValue code={ObservationCodes.pulseOximeter} />
      </div>
    );
  }
}

DashboardPage.propTypes = {
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
)(DashboardPage);
