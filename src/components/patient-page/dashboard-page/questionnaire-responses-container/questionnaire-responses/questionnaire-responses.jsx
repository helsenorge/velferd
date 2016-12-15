import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import shortId from 'shortid';
import './questionnaire-responses.scss';
import LatestMeasurement from './../../latest-measurement/latest-measurement.jsx';
import Description from './../../description/description.jsx';
import Icon from '../../../../icon/icon.jsx';
import { getIcon } from '../../../../../helpers/questionnaire-response-helpers.js';
import Spinner from '../../../../spinner/spinner.jsx';

class QuestionnaireResponses extends Component {

  getQuestionsAndAnswers(entries) {
    const questions = {};
    entries.forEach((entry) => {
      if (!entry.resource.group.question) {
        return;
      }
      entry.resource.group.question.forEach((question) => {
        if (!questions[question.linkId]) {
          questions[question.linkId] = { text: question.text, answers: {} };
        }
        const date = new Date(entry.resource.authored).toLocaleDateString();
        const value = question.answer[0].valueCoding.code;
        questions[question.linkId].answers[date] = value;
      });
    });
    return questions;
  }

  getRows(questions, fromDate, toDate, selectedDate) {
    const rows = [];

    Object.keys(questions).forEach((key) => {
      if (questions.hasOwnProperty(key)) {
        const question = questions[key];
        const cells = this.getCells(question, fromDate, toDate, selectedDate);

        rows.push(
          <tr key={key}>
            <td className="questionnaire-responses-table__question">{question.text}</td>
            {cells}
          </tr>);
      }
    });

    return rows;
  }

  getCells(question, fromDate, toDate, selectedDate) {
    const cells = [];
    for (let d = new Date(fromDate); d.getTime() < toDate.getTime(); d.setDate(d.getDate() + 1)) {
      const date = d.toLocaleDateString();
      const answer = question.answers[date];
      const iconValue = answer ? getIcon(answer) : null;
      const cellContent = iconValue ? <Icon glyph={iconValue} width={20} height={20} /> : answer;

      console.log(d);

      const cellClasses = classNames(
        'questionnaire-responses-table__data',
        { 'questionnaire-responses-table__data--selected':
          selectedDate !== null && selectedDate.getTime() === d.getTime(),
          'questionnaire-responses-table__data--notselected':
          selectedDate !== null && selectedDate.getTime() !== d.getTime(),
        });

      cells.push(
        <td className={cellClasses} key={date}>
          {cellContent}
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

      if (entry.resource.group.question) {
        entry.resource.group.question.forEach((question) => {
          const value = question.answer[0].valueCoding.code;
          values[question.linkId] = value;
        });
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
    const { data, fromDate, toDate, selectedDate, activeRange, loading, empty, error } = this.props;

    if (error) {
      return (
        <div className="questionnaire-responses">
          <div className="questionnaire-responses__chart">
            <Description name="Egenvurdering" error={error} />
          </div>
        </div>
      );
    }

    if (empty) {
      return (
        <div className="questionnaire-responses">
          <div className="questionnaire-responses__chart">
            <Description name="Egenvurdering" empty />
          </div>
        </div>
      );
    }

    if (loading) {
      return (
        <div className="questionnaire-responses">
          <div className="questionnaire-responses__chart">
            <Description name="Egenvurdering" />
            <div className="questionnaire-responses__table-container">
              <Spinner className="questionnaire-responses__spinner" />
            </div>
          </div>
          <LatestMeasurement empty />
        </div>
      );
    }

    const questions = this.getQuestionsAndAnswers(data.entry);
    const rows = this.getRows(questions, fromDate, toDate, selectedDate);
    const latestValue = this.getLatestValue(questions, data.entry);
    const tableClasses = classNames('questionnaire-responses-table', {
      'questionnaire-responses-table--borders': activeRange < 90,
    });
    const borders = activeRange >= 90 ? this.createBorders() : null;
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
  loading: PropTypes.bool,
  empty: PropTypes.bool,
  data: PropTypes.object,
  fromDate: React.PropTypes.instanceOf(Date),
  toDate: React.PropTypes.instanceOf(Date),
  selectedDate: React.PropTypes.instanceOf(Date),
  activeRange: PropTypes.number,
  error: PropTypes.object,
};

export default QuestionnaireResponses;
