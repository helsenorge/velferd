import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MeasurementContainer from '../../containers/measurement-container';
import ObservationCodes from '../../constants/observation-codes';

class DashboardPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fromDate: new Date(2016, 5, 19),
      toDate: new Date(2016, 6, 3),
    };
  }

  handleRangeClick() {
    // this.setState({ daysToShow: value });
  }

  render() {
    return (
      <div>
        <h4>Pasientens egne tilbakemeldinger og målinger</h4>
        <nav>
          <a onClick={() => this.handleRangeClick(7)}>Last 2 weeks</a>
          {" | "}
          <a onClick={() => this.handleRangeClick(30)}>Last month</a>
          {" | "}
          <a onClick={() => this.handleRangeClick(90)}>Last 3 months</a>
        </nav>
        <br />
        <MeasurementContainer
          fromDate={this.state.fromDate}
          toDate={this.state.toDate}
          code={ObservationCodes.bloodPressure}
        />
        <MeasurementContainer
          fromDate={this.state.fromDate}
          toDate={this.state.toDate}
          code={ObservationCodes.weight}
        />
        <MeasurementContainer
          fromDate={this.state.fromDate}
          toDate={this.state.toDate}
          code={ObservationCodes.pulse}
        />
        <MeasurementContainer
          fromDate={this.state.fromDate}
          toDate={this.state.toDate}
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
