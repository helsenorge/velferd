import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as questionnaireResponsesActions from '../../../actions/questionnaire-responses';
import QuestionnaireResponses from './questionnaire-responses/questionnaire-responses.jsx';
import { bindActionCreators } from 'redux';

class QuestionnaireResponsesContainer extends Component {

  componentDidMount() {
    const { fhirUrl, patientId, questionnaireId, token } = this.props;
    this.props.actions.fetchQuestionnaireResponses(fhirUrl, patientId, questionnaireId, token);
  }

  render() {
    const { data, isFetching } = this.props;
    const isEmpty = data === null;
    return (
      <div>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <QuestionnaireResponses
              data={data}
              fromDate={this.props.fromDate}
              toDate={this.props.toDate}
              selectedDate={this.props.selectedDate}
              icon={this.props.icon}
            />
          </div>
        }
      </div>
    );
  }
}

QuestionnaireResponsesContainer.propTypes = {
  fhirUrl: PropTypes.string.isRequired,
  patientId: PropTypes.string.isRequired,
  questionnaireId: PropTypes.string.isRequired,
  data: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  actions: PropTypes.object.isRequired,
  fromDate: React.PropTypes.instanceOf(Date).isRequired,
  toDate: React.PropTypes.instanceOf(Date).isRequired,
  selectedDate: React.PropTypes.instanceOf(Date),
  icon: React.PropTypes.string,
  token: React.PropTypes.string,
};

function mapStateToProps(state) {
  const { questionnaireResponses, settings, auth } = state;
  const {
    isFetching,
    lastUpdated,
    data,
  } = questionnaireResponses || {
    isFetching: true,
    data: null,
  };

  const { fhirUrl, patientId } = settings;

  return {
    fhirUrl,
    patientId,
    data,
    isFetching,
    lastUpdated,
    token: auth.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(questionnaireResponsesActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireResponsesContainer);
