import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as questionnaireResponsesActions from '../../../../actions/questionnaire-responses';
import QuestionnaireResponses from './questionnaire-responses/questionnaire-responses.jsx';
import { bindActionCreators } from 'redux';

class QuestionnaireResponsesContainer extends Component {

  componentDidMount() {
    const { patientId, fromDate, toDate } = this.props;
    this.props.actions.fetchQuestionnaireResponses(fromDate, toDate, patientId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.fromDate !== nextProps.fromDate || this.props.toDate !== nextProps.toDate) {
      const { patientId, fromDate, toDate } = nextProps;
      this.props.actions.fetchQuestionnaireResponses(fromDate, toDate, patientId);
    }
  }

  render() {
    const { data, isFetching, error } = this.props;
    const isEmpty = data === null || data.length === 0;
    let qResponses = null;

    if (error) {
      qResponses = <QuestionnaireResponses error={error} />;
    }
    else if (isFetching) {
      qResponses = <QuestionnaireResponses loading />;
    }
    else if (isEmpty) {
      qResponses = <QuestionnaireResponses empty />;
    }
    else {
      qResponses = (<QuestionnaireResponses
        data={data}
        fromDate={this.props.fromDate}
        toDate={this.props.toDate}
        selectedDate={this.props.selectedDate}
        activeRange={this.props.activeRange}
      />);
    }
    return qResponses;
  }
}

QuestionnaireResponsesContainer.propTypes = {
  patientId: PropTypes.string.isRequired,
  data: PropTypes.array,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  actions: PropTypes.object.isRequired,
  fromDate: React.PropTypes.instanceOf(Date).isRequired,
  toDate: React.PropTypes.instanceOf(Date).isRequired,
  selectedDate: React.PropTypes.instanceOf(Date),
  activeRange: PropTypes.number.isRequired,
  error: PropTypes.object,
};

function mapStateToProps(state) {
  const { questionnaireResponses, patient } = state;
  const {
    isFetching,
    lastUpdated,
    data,
    error,
  } = questionnaireResponses || {
    isFetching: true,
    data: [],
  };

  return {
    patientId: patient.activePatient.id,
    data,
    isFetching,
    lastUpdated,
    error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(questionnaireResponsesActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireResponsesContainer);
