import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MeasurementContainer from './measurement-container/measurement-container.jsx';
import QuestionnaireResponsesContainer from
  './questionnaire-responses-container/questionnaire-responses-container';
import ObservationCodes from '../../constants/observation-codes';
import Header from './header/header.jsx';
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

    const selectedDate = null;

    this.state = { fromDate, toDate, dayRange, selectedDate };
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleForwardClick = this.handleForwardClick.bind(this);
    this.handleSingleBackClick = this.handleSingleBackClick.bind(this);
    this.handleSingleForwardClick = this.handleSingleForwardClick.bind(this);
    this.handleRangeClick = this.handleRangeClick.bind(this);
    this.handleDateClick = this.handleDateClick.bind(this);
  }

  handleBackClick() {
    this.moveDates(- this.state.dayRange);
  }

  handleSingleBackClick() {
    this.moveDates(-1);
  }

  moveDates(days) {
    const { fromDate, toDate } = this.state;
    fromDate.setDate(fromDate.getDate() + days);
    toDate.setDate(toDate.getDate() + days);
    this.setState({ fromDate: new Date(fromDate), toDate: new Date(toDate) });
  }

  handleForwardClick() {
    this.moveDates(this.state.dayRange);
  }

  handleSingleForwardClick() {
    this.moveDates(1);
  }

  handleRangeClick(days) {
    const { toDate, dayRange } = this.state;

    if (days !== dayRange) {
      const fromDate = new Date(toDate.getTime());
      fromDate.setDate(fromDate.getDate() - days);
      this.setState({ fromDate: new Date(fromDate), dayRange: days });
    }
  }

  handleDateClick(date) {
    const { selectedDate } = this.state;

    if (!selectedDate) {
      this.setState({ selectedDate: date });
    }
    else if (selectedDate.valueOf() === date.valueOf()) {
      this.setState({ selectedDate: null });
    }
    else {
      this.setState({ selectedDate: date });
    }
  }

  render() {
    const to = new Date(this.state.toDate.getTime());
    to.setDate(to.getDate() - 1);
    return (
      <div className="dashboard-page">
        <Header
          handleRangeClick={this.handleRangeClick}
          handleForwardClick={this.handleForwardClick}
          handleBackClick={this.handleBackClick}
          handleSingleForwardClick={this.handleSingleForwardClick}
          handleSingleBackClick={this.handleSingleBackClick}
          handleDateClick={this.handleDateClick}
          fromDate={this.state.fromDate}
          toDate={this.state.toDate}
          activeRange={this.state.dayRange}
        />
        <QuestionnaireResponsesContainer
          fromDate={this.state.fromDate}
          toDate={this.state.toDate}
          selectedDate={this.state.selectedDate}
          questionnaireId={this.props.questionnaireId}
        />
        <MeasurementContainer
          fromDate={this.state.fromDate}
          toDate={this.state.toDate}
          selectedDate={this.state.selectedDate}
          code={ObservationCodes.bloodPressure}
        />
        <MeasurementContainer
          fromDate={this.state.fromDate}
          toDate={this.state.toDate}
          selectedDate={this.state.selectedDate}
          code={ObservationCodes.weight}
        />
        <MeasurementContainer
          fromDate={this.state.fromDate}
          toDate={this.state.toDate}
          selectedDate={this.state.selectedDate}
          code={ObservationCodes.pulse}
        />
        <MeasurementContainer
          fromDate={this.state.fromDate}
          toDate={this.state.toDate}
          selectedDate={this.state.selectedDate}
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
