import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import shortId from 'shortid';
import { calculateDateRange }
  from '../../../../helpers/date-helpers.js';
import './questionnaire-responses.scss';
import LatestMeasurement from './../../latest-measurement/latest-measurement.jsx';
import Description from './../../description/description.jsx';
import Icon from '../../../icon/icon.jsx';
import { getIcon } from '../../../../helpers/questionnaire-response-helpers.js';

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

  getRows(questions, fromDate, toDate, selectedDate) {
    const rows = [];
    let selectedCellIndex = null;

    if (selectedDate) {
      selectedCellIndex = calculateDateRange(fromDate, selectedDate);
    }

    Object.keys(questions).forEach((key) => {
      if (questions.hasOwnProperty(key)) {
        const question = questions[key];
        const values = this.getValues(question, fromDate, toDate);
        const cells = this.getCells(values, selectedCellIndex);

        rows.push(
          <tr key={key}>
            <td className="questionnaire-responses-table__question">{question.text}</td>
            {cells}
          </tr>);
      }
    });
    return rows;
  }

  getValues(question, fromDate, toDate) {
    const values = [];
    for (let d = new Date(fromDate); d.getTime() < toDate.getTime(); d.setDate(d.getDate() + 1)) {
      const date = d.toLocaleDateString();
      let value = question.answers[date];
      if (!value) value = 'empty';
      values.push(value);
    }
    return values;
  }

  getCells(values, selectedCellIndex) {
    const cells = [];

    for (let i = 0; i < values.length; i++) {
      const val = getIcon(values[i]);
      const cellClasses = classNames(
        'questionnaire-responses-table__data',
        { 'questionnaire-responses-table__data--selected':
          selectedCellIndex !== null && selectedCellIndex === i });

      cells.push(
        <td className={cellClasses} key={i}>
          <Icon glyph={val} width={20} height={20} />
        </td>
      );
    }
    return cells;
  }

  getLatestValue(questions, entries) {
    const values = {};
    Object.keys(questions).forEach((key) => {
      if (questions.hasOwnProperty(key)) {
        values[key] = null;
      }
    });

    let latestValue = { date: '', results: {} };

    if (entries && entries.length > 0) {
      const entry = entries[entries.length - 1];

      for (let i = 0; i < entry.resource.group.group[0].question.length; i++) {
        const question = entry.resource.group.group[0].question[i];
        const value = question.answer[0].valueCoding.code;
        values[question.linkId] = value;
      }

      latestValue = {
        date: entry.resource.authored,
        results: values,
      };
    }

    return latestValue;
  }

  createBorders() {
    const months = document.getElementsByClassName('month');
    const borders = [];
    const boundingLeft = document.getElementsByClassName('range__wrapper')[0].
      getBoundingClientRect().left;
    for (let i = 1; i < months.length; i++) {
      const styleLeft = months[i].getBoundingClientRect().left - boundingLeft;
      borders.push((
        <div
          key={shortId.generate()}
          style={{ left: styleLeft }}
          className="questionnaire-responses-table__border"
        />));
    }
    return borders;
  }

  render() {
    const { data, fromDate, toDate, selectedDate, activeRange } = this.props;

    const questions = this.getQuestions(data.entry);
    const rows = this.getRows(questions, fromDate, toDate, selectedDate);
    const latestValue = this.getLatestValue(questions, data.entry);
    const tableClasses = classNames('questionnaire-responses-table', {
      'questionnaire-responses-table--borders': activeRange < 90,
    });
    const borders = this.createBorders();
    return (
      <div className="questionnaire-responses">
        <div className="questionnaire-responses__chart">
          <Description name="Egenvurdering" />
          <div className="questionnaire-responses__table-container">
            {borders}
            <table className={tableClasses}>
              <tbody>
                {rows}
              </tbody>
            </table>
          </div>
        </div>
        <LatestMeasurement
          date={latestValue.date}
          questionnaireResponses={latestValue.results}
        />
      </div>
    );
  }
}

QuestionnaireResponses.propTypes = {
  data: PropTypes.object.isRequired,
  fromDate: React.PropTypes.instanceOf(Date).isRequired,
  toDate: React.PropTypes.instanceOf(Date).isRequired,
  selectedDate: React.PropTypes.instanceOf(Date),
  activeRange: PropTypes.number.isRequired,
};

export default QuestionnaireResponses;
