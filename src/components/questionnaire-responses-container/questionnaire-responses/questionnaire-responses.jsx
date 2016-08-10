import React, { Component, PropTypes } from 'react';
import { filterEntries } from '../../../helpers/date-helpers.js';
import './questionnaire-responses.scss';

class QuestionnaireResponses extends Component {

  getQuestions(entries) {
    const questions = {};
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];

      for (let ii = 0; ii < entry.resource.group.group[0].question.length; ii++) {
        const question = entry.resource.group.group[0].question[i];
        if (!questions[question.linkId]) {
          questions[question.linkId] = { text: question.text, answers: [] };
        }
        questions[question.linkId].answers.push(question.answer[0].valueCoding.code);
      }
    }
    return questions;
  }

  render() {
    const entries = filterEntries(
      this.props.data.entry, this.props.fromDate, this.props.toDate);
    const questions = this.getQuestions(entries);
    const rows = [];

    Object.keys(questions).forEach((key) => {
      if (questions.hasOwnProperty(key)) {
        const question = questions[key];
        const cols = question.answers.map((answer) => (
          <td>{answer}</td>
        ));
        rows.push(<tr key={key}><td>{question.text}</td>{cols}</tr>);
      }
    });

    return (
      <div className="questionnaire" >
        <table>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

QuestionnaireResponses.propTypes = {
  data: PropTypes.object.isRequired,
  fromDate: React.PropTypes.instanceOf(Date).isRequired,
  toDate: React.PropTypes.instanceOf(Date).isRequired,
};

export default QuestionnaireResponses;
