import React, { Component, PropTypes } from 'react';
import Chart from '../components/chart.jsx';
import { formatDate, filterPointsSince } from './date-helpers.js';
import './measurement.scss';

class QuestionnaireResponses extends Component {

  getStatus(questions) {
    return questions[0].answer[0].valueCoding.display;
  }

  getScore(questions) {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      score += parseInt(questions[i].answer[0].valueCoding.code, 10);
    }
    return score;
  }

  getDataPoint(item) {
    const questions = item.resource.group.group[0].question;
    const point = {
      date: item.resource.authored,
      value: [],
      status: this.getStatus(questions),
    };
    point.value.push(this.getScore(questions));
    return point;
  }

  render() {
    let points = this.props.data.entry.map(this.getDataPoint, this);
    points = filterPointsSince(points, 7);

    let chart;
    let lastDate;
    let lastValue;
    let lastStatus;

    if (points.length > 0) {
      const last = points[points.length - 1];
      lastDate = formatDate(last.date);
      lastValue = `${last.value} poeng`;
      lastStatus = last.status;
      chart = (<Chart dataPoints={points} high={15} low={0} />);
    }

    return (
      <div className="measurement" >
        <span className="measurement__name">Egenvurdering</span>
        <span className="measurement__chart">>{chart}</span>
        <span className="measurement__lastValue">
          <div className="measurement__lastValue__value">{lastValue}</div>
          <div>{lastDate}</div>
          <div>{lastStatus}</div>
        </span>
      </div>
    );
  }
}

QuestionnaireResponses.propTypes = {
  data: PropTypes.object.isRequired,
};

export default QuestionnaireResponses;
