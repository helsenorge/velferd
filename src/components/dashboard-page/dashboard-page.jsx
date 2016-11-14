import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getPatientGoal, getLastUpdated } from '../../helpers/care-plan-helpers.js';
import MeasurementContainer from './measurement-container/measurement-container.jsx';
import QuestionnaireResponsesContainer from
  './questionnaire-responses-container/questionnaire-responses-container';
import ObservationCodes from '../../constants/observation-codes';
import Header from './header/header.jsx';
import ToTheTop from './to-the-top/to-the-top.jsx';
import './dashboard-page.scss';

class DashboardPage extends Component {

  constructor(props) {
    super(props);

    const dayRange = 14;

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
    this.addOpacityOverlay = this.addOpacityOverlay.bind(this);
    this.removeOpacityOverlay = this.removeOpacityOverlay.bind(this);
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

  addOpacityOverlay() {
    const overlay = document.getElementById('overlay');
    overlay.classList.add('dashboard-page__overlay--active');
  }

  removeOpacityOverlay() {
    const overlay = document.getElementById('overlay');
    overlay.classList.remove('dashboard-page__overlay--active');
  }

  handleDateClick(date) {
    const { selectedDate } = this.state;

    if (!selectedDate) {
      this.addOpacityOverlay();
      this.setState({ selectedDate: date });
    }
    else if (selectedDate.valueOf() === date.valueOf()) {
      this.setState({ selectedDate: null });
      this.removeOpacityOverlay();
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
        <div className="dashboard-page__overlay" id="overlay" />
        <Header
          handleRangeClick={this.handleRangeClick}
          handleForwardClick={this.handleForwardClick}
          handleBackClick={this.handleBackClick}
          handleSingleForwardClick={this.handleSingleForwardClick}
          handleSingleBackClick={this.handleSingleBackClick}
          handleDateClick={this.handleDateClick}
          fromDate={this.state.fromDate}
          toDate={this.state.toDate}
          selectedDate={this.state.selectedDate}
          activeRange={this.state.dayRange}
          patientGoal={this.props.patientGoal}
          carePlanLastUpdated={this.props.carePlanLastUpdated}
        />
        <QuestionnaireResponsesContainer
          fromDate={this.state.fromDate}
          toDate={this.state.toDate}
          selectedDate={this.state.selectedDate}
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
        <ToTheTop />
      </div>
    );
  }
}

DashboardPage.propTypes = {
  patientGoal: PropTypes.string,
  carePlanLastUpdated: React.PropTypes.instanceOf(Date),
};

function mapStateToProps(state) {
  const { carePlan } = state;

  let patientGoal;
  let carePlanLastUpdated;
  if (carePlan.data !== null
    && carePlan.data.resourceType === 'Bundle'
    && carePlan.data.total > 0) {
    patientGoal = getPatientGoal(carePlan.data.entry[0].resource);
    carePlanLastUpdated = getLastUpdated(carePlan.data.entry[0].resource);
  }

  return {
    patientGoal,
    carePlanLastUpdated,
  };
}

export default connect(
  mapStateToProps,
)(DashboardPage);
