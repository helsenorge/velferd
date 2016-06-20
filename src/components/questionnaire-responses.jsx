import React, { Component, PropTypes } from 'react';
import Chart from '../components/chart.jsx';
import { formatDate } from './date-helpers.js';
import './measurement.scss';

class QuestionnaireResponses extends Component {

  componentDidMount() {
  }

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
      value: this.getScore(questions),
      status: this.getStatus(questions),
    };
    return point;
  }

  render() {
    let points = this.props.data.entry.map(this.getDataPoint, this);
    points = points.slice(Math.max(points.length - 5, 1));
    const last = points[points.length - 1];
    const lastDate = formatDate(last.date);

    return (
      <div className="measurement" >
        <span className="measurement__name">Skjemasvar</span>
        <span className="measurement__chart"><Chart dataPoints={points} high={15} low={0} />
        </span>
        <span className="measurement__lastValue">
          <div className="measurement__lastValue__value">{`${last.value}`} poeng</div>
          <div>{`${lastDate}`}</div>
          <div>{`${last.status}`}</div>
        </span>
      </div>
    );
  }
}

QuestionnaireResponses.propTypes = {
  data: PropTypes.object.isRequired,
};

export default QuestionnaireResponses;
