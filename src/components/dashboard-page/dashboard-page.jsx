import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MeasurementContainer from '../measurement/measurement-container';
import ObservationCodes from '../../constants/observation-codes';
import { formatDate } from '../date-helpers/date-helpers.js';
import './dashboard-page.scss';

class DashboardPage extends Component {

  constructor(props) {
    super(props);

    const dayRange = 7;

    const toDate = new Date();
    toDate.setHours(0, 0, 0, 0);
    toDate.setDate(toDate.getDate() + 1);

    const fromDate = new Date(toDate.getTime());
    fromDate.setDate(fromDate.getDate() - dayRange);

    this.state = { fromDate, toDate, dayRange };
  }

  handleBackClick() {
    const { fromDate, toDate, dayRange } = this.state;
    fromDate.setDate(fromDate.getDate() - dayRange);
    toDate.setDate(toDate.getDate() - dayRange);
    this.setState({ fromDate: new Date(fromDate), toDate: new Date(toDate) });
  }

  handleForwardClick() {
    const { fromDate, toDate, dayRange } = this.state;
    fromDate.setDate(fromDate.getDate() + dayRange);
    toDate.setDate(toDate.getDate() + dayRange);
    this.setState({ fromDate: new Date(fromDate), toDate: new Date(toDate) });
  }

  handleRangeClick(days) {
    const { toDate, dayRange } = this.state;

    if (days !== dayRange) {
      const fromDate = new Date(toDate.getTime());
      fromDate.setDate(fromDate.getDate() - days);
      this.setState({ fromDate: new Date(fromDate), dayRange: days });
    }
  }

  render() {
    const to = new Date(this.state.toDate.getTime());
    to.setDate(to.getDate() - 1);
    return (
      <div>
        <h4>Resultater</h4>
        <nav>
          <a onClick={() => this.handleRangeClick(7)}>7 days</a>
          {" | "}
          <a onClick={() => this.handleRangeClick(14)}>14 days</a>
          {" | "}
          <a onClick={() => this.handleRangeClick(30)}>30 days</a>
          {" | "}
          <a onClick={() => this.handleRangeClick(90)}>90 days</a>
        </nav>
        <br />
        <nav>
          <a onClick={() => this.handleBackClick()}>&lt;&lt;&nbsp;&nbsp;</a>
          <span>{formatDate(this.state.fromDate)}</span>
          {" --- "}
          <span>{formatDate(to)}</span>
          <a onClick={() => this.handleForwardClick()}>&nbsp;&nbsp;&gt;&gt;</a>
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
