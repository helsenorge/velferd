import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { filterQuestionnaireResponses, calculateDateRange, getNumberofColumnsinChart }
  from '../../../../helpers/date-helpers.js';
import './questionnaire-responses.scss';
import LatestMeasurement from './../../latest-measurement/latest-measurement.jsx';
import Description from './../../description/description.jsx';
import Icon from '../../../icon/icon.jsx';
import ansikt1 from '../../../../../svg/face1.svg';
import ansikt2 from '../../../../../svg/face2.svg';
import ansikt3 from '../../../../../svg/face3.svg';


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
    const dateRange = calculateDateRange(fromDate, toDate);
    const cols = getNumberofColumnsinChart(dateRange);
    const valuesPerCell = Math.floor(dateRange / cols);

    let selectedCellIndex = null;

    if (selectedDate && valuesPerCell === 1) {
      selectedCellIndex = calculateDateRange(fromDate, selectedDate);
    }

    Object.keys(questions).forEach((key) => {
      if (questions.hasOwnProperty(key)) {
        const question = questions[key];
        const values = this.getValues(question, fromDate, toDate);
        const cells = this.getCells(values, valuesPerCell, selectedCellIndex);

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

  getCells(values, valuesPerCell, selectedCellIndex) {
    let count = 0;
    const cells = [];
    let cellValue;

    for (let i = 0; i < values.length; i++) {
      count ++;
      const value = values[i];

      if (value && value !== 'empty') {
        if (!cellValue || value < cellValue) {
          cellValue = value;
        }
      }

      if (count === valuesPerCell || i === value.length - 1) {
        const val = this.getIcon(cellValue);
        const cellClasses = classNames(
          'questionnaire-responses-table__data',
          { 'questionnaire-responses-table__data--selected':
            selectedCellIndex !== null && selectedCellIndex === i });

        cells.push(
          <td className={cellClasses} key={i}>
            <Icon glyph={val} width={20} height={20} />
          </td>
        );
        count = 0;
        cellValue = null;
      }
    }
    return cells;
  }

  getIcon(value) {
    switch (value) {
    case '1':
      return ansikt1;
    case '2':
      return ansikt2;
    case '3':
      return ansikt3;
    default:
      return null;
    }
  }

  render() {
    const { data, fromDate, toDate, selectedDate } = this.props;
    const entries = filterQuestionnaireResponses(data.entry, fromDate, toDate);
    const questions = this.getQuestions(entries);
    const rows = this.getRows(questions, fromDate, toDate, selectedDate);

    return (
      <div className="questionnaire-responses">
        <div className="questionnaire-responses__chart">
          <Description name="Egenvurdering" icon={this.props.icon} />
          <div className="questionnaire-responses__table-container">
            <table className="questionnaire-responses-table">
              <tbody>
                {rows}
              </tbody>
            </table>
          </div>
        </div>
        <LatestMeasurement
          data={{ date: '2012', value: '', unit: '' }}
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
  icon: React.PropTypes.string,
};

export default QuestionnaireResponses;
