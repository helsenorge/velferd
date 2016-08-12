import React, { Component, PropTypes } from 'react';
import { filterEntries } from '../../../../helpers/date-helpers.js';
import './questionnaire-responses.scss';

class QuestionnaireResponses extends Component {

  getQuestions(entries) {
    const questions = {};

    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];

      for (let ii = 0; ii < entry.resource.group.group[0].question.length; ii++) {
        const question = entry.resource.group.group[0].question[ii];

        if (!questions[question.linkId]) {
          questions[question.linkId] = { text: question.text, answers: {} };
        }
        const date = new Date(entry.resource.authored).toLocaleDateString();
        const value = question.answer[0].valueCoding.code;
        questions[question.linkId].answers[date] = value;
      }
    }
    return questions;
  }

  getRows(questions, fromDate, toDate) {
    const rows = [];
    Object.keys(questions).forEach((key) => {
      if (questions.hasOwnProperty(key)) {
        const question = questions[key];
        const cells = this.getCells(question, fromDate, toDate);
        rows.push(<tr key={key}><td>{question.text}</td>{cells}</tr>);
      }
    });
    return rows;
  }

  getCells(question, fromDate, toDate) {
    const cells = [];
    for (let d = new Date(fromDate);
          d.getTime() < toDate.getTime();
          d.setDate(d.getDate() + 1)) {
      const date = d.toLocaleDateString();
      const value = question.answers[date];
      cells.push(<td>{value}</td>);
    }
    return cells;
  }

  render() {
    const { data, fromDate, toDate } = this.props;
    const entries = filterEntries(data.entry, fromDate, toDate);
    const questions = this.getQuestions(entries);
    const rows = this.getRows(questions, fromDate, toDate);

    return (
      <div className="questionnaire-repsonses" >
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
