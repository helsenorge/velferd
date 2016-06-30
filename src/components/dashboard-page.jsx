import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MeasurementContainer from '../containers/measurement-container';
import QuestionnaireResponsesContainer from '../containers/questionnaire-responses-container';
import ObservationCodes from '../constants/observation-codes';

class DashboardPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      daysToShow: 7,
    };
  }

  handleRangeClick(value) {
    this.setState({ daysToShow: value });
  }

  render() {
    return (
      <div>
        <h4>Pasientens egne tilbakemeldinger og målinger</h4>
        <nav>
          <a onClick={() => this.handleRangeClick(7)}>Last week</a>
          {" | "}
          <a onClick={() => this.handleRangeClick(30)}>Last month</a>
          {" | "}
          <a onClick={() => this.handleRangeClick(90)}>Last 3 months</a>
        </nav>
        <QuestionnaireResponsesContainer questionnaireId={this.props.questionnaireId} />
        <MeasurementContainer
          daysToShow={this.state.daysToShow}
          code={ObservationCodes.bloodPressure}
        />
        <MeasurementContainer
          daysToShow={this.state.daysToShow}
          code={ObservationCodes.weight}
        />
        <MeasurementContainer
          daysToShow={this.state.daysToShow}
          code={ObservationCodes.pulse}
        />
        <MeasurementContainer
          daysToShow={this.state.daysToShow}
          code={ObservationCodes.pulseOximeter}
        />
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
