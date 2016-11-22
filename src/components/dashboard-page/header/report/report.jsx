import React, { Component, PropTypes } from 'react';
import './report.scss';
import { connect } from 'react-redux';
import Collapse from 'react-collapse';
import iconChevron from '../../../../../svg/chevron-left.svg';
import Icon from '../../../icon/icon.jsx';
import classNames from 'classnames';
import { formatDate, filterObservationsInRange, filterQuestionnaireResponses }
  from '../../../../helpers/date-helpers.js';
import { getMeasurementName } from '../../../../helpers/observation-helpers';
import ObservationCodes from '../../../../constants/observation-codes';
import QuestionnaireResponseCodes from '../../../../constants/questionnaire-response-codes';
import Button from '../../../button/button.jsx';
import Clipboard from 'clipboard';

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
    this.handleClick = this.handleClick.bind(this);

    const clipboard = new Clipboard('.report__copybutton', { // eslint-disable-line
      text: (trigger) => {
        const button = trigger;
        button.innerText = 'Tekst kopiert!';
        setTimeout(() => {
          button.innerText = 'Kopier tekst';
        }, 1000);
        return document.getElementById('copy-target').innerText;
      },
    });
  }

  handleClick() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const { questionnaireReport, measurementReports, fromDate, toDate } = this.props;
    const iconClass = classNames({
      report__chevron: true,
      'report__chevron--open': this.state.expanded,
    });
    let questionnaireReportMarkup;
    if (questionnaireReport) {
      questionnaireReportMarkup = (
        <p className="report__paragraph">
              Andel grønne smilefjes: {questionnaireReport.greenPercent}%
              , oransje: {questionnaireReport.yellowPercent}% og røde
              : {questionnaireReport.redPercent}%.
        </p>);
    }
    return (
      <div className="report">
        <button
          onClick={this.handleClick}
          className="report__expanderbutton"
        >
          Rapport denne perioden
          <Icon glyph={iconChevron} className={iconClass} />
        </button>
        <Collapse isOpened={this.state.expanded}>
          <div className="report__expander">
            <div id="copy-target">
              <h3 className="report__header">
               {formatDate(fromDate)} - {formatDate(toDate)} 2016
              </h3>
              {measurementReports.map((measurement, i) =>
                <p className="report__paragraph" key={i}>
                  <b>{measurement.name}</b> har variert mellom {measurement.min}&nbsp;
                  og {measurement.max} og har et gjennomsnitt på {measurement.average}.
                </p>
              )}
              {questionnaireReportMarkup}
            </div>
            <Button lvl1 className="report__copybutton">
              Kopier tekst
            </Button>
          </div>
        </Collapse>
      </div>
      );
  }
}

Report.propTypes = {
  fromDate: PropTypes.instanceOf(Date).isRequired,
  toDate: PropTypes.instanceOf(Date).isRequired,
  measurementReports: PropTypes.array.isRequired,
  questionnaireReport: PropTypes.object,
};

function calculateValues(values, code) {
  const average = Math.round(values.reduce((a, b) => a + b) / values.length);
  return {
    name: getMeasurementName(code),
    min: Math.min(...values),
    max: Math.max(...values),
    average,
  };
}

function calculateForCompoundMeasurement(entries) {
  const values = {};

  entries.forEach(entry => {
    entry.resource.component.forEach(component => {
      const code = component.code.coding[0].code;
      if (code !== ObservationCodes.bloodPressureMean) {
        if (!values[code]) {
          values[code] = [];
        }
        values[code].push(component.valueQuantity.value);
      }
    });
  });

  const data = [];

  Object.keys(values).forEach((key) => {
    if (values.hasOwnProperty(key)) {
      data.push(calculateValues(values[key], key));
    }
  });

  return data;
}

function calculateQuestionnaireValues(entries) {
  const count = {};
  count[QuestionnaireResponseCodes.green] = 0;
  count[QuestionnaireResponseCodes.yellow] = 0;
  count[QuestionnaireResponseCodes.red] = 0;

  for (let i = 0; i < entries.length; i++) {
    const resource = entries[i].resource;
    for (let ii = 0; ii < resource.group.group[0].question.length; ii++) {
      const question = resource.group.group[0].question[ii];
      const value = question.answer[0].valueCoding.code;
      count[value] ++;
    }
  }

  const total = count[QuestionnaireResponseCodes.green] +
    count[QuestionnaireResponseCodes.yellow] + count[QuestionnaireResponseCodes.red];

  return {
    greenPercent: total > 0 ?
     Math.round((count[QuestionnaireResponseCodes.green] * 100) / total) : 0,
    yellowPercent: total > 0 ?
     Math.round((count[QuestionnaireResponseCodes.yellow] * 100) / total) : 0,
    redPercent: total > 0 ?
     Math.round((count[QuestionnaireResponseCodes.red] * 100) / total) : 0,
  };
}

function mapStateToProps(state, ownProps) {
  const { observationsByCode, questionnaireResponses } = state;
  const { fromDate, toDate } = ownProps;

  let questionnaireReport;
  if (questionnaireResponses.data && questionnaireResponses.data.entry) {
    const entries = filterQuestionnaireResponses(
      questionnaireResponses.data.entry, fromDate, toDate);
    questionnaireReport = calculateQuestionnaireValues(entries);
  }

  const measurementReports = [];
  Object.keys(observationsByCode).forEach((key) => {
    if (observationsByCode.hasOwnProperty(key)) {
      const observations = observationsByCode[key];

      if (observations.data && observations.data.entry) {
        const entries = filterObservationsInRange(observations.data.entry, fromDate, toDate);

        if (entries.length > 0 && entries[0].resource.valueQuantity) {
          const values = entries.map(entry => parseInt(entry.resource.valueQuantity.value, 10));
          measurementReports.push(calculateValues(values, key));
        }
        else {
          measurementReports.push(...calculateForCompoundMeasurement(entries));
        }
      }
    }
  });

  return { measurementReports, questionnaireReport };
}

export default connect(mapStateToProps)(Report);
