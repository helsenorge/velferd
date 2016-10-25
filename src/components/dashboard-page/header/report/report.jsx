import React, { Component, PropTypes } from 'react';
import './report.scss';
import { connect } from 'react-redux';
import Collapse from 'react-collapse';
import iconChevron from '../../../../../svg/chevron-left.svg';
import Icon from '../../../icon/icon.jsx';
import classNames from 'classnames';
import { formatDate, filterObservationsInRange } from '../../../../helpers/date-helpers.js';
import { getMeasurementName } from '../../../../helpers/observation-helpers';

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const iconClass = classNames({
      report__chevron: true,
      'report__chevron--open': this.state.expanded,
    });
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
            <h3 className="report__header">
               {formatDate(this.props.fromDate)} - {formatDate(this.props.toDate)} 2016
            </h3>
            {this.props.data.map((measurement, i) =>
              <p className="report__paragraph" key={i}>
                <b>{measurement.name}</b> har variert mellom {measurement.min}&nbsp;
                og {measurement.max} og har et gjennomsnitt på {measurement.average}.
              </p>
            )}
            <p className="report__paragraph">
              Andel grønne smilefjes: 80%, oransje: 15% og røde: 5%.
            </p>
            <button className="report__copybutton">Kopier tekst</button>
          </div>
        </Collapse>
      </div>
      );
  }
}

Report.propTypes = {
  fromDate: PropTypes.instanceOf(Date).isRequired,
  toDate: PropTypes.instanceOf(Date).isRequired,
  data: PropTypes.array.isRequired,
};

function calculateReportValues(entries, code) {
  const values = entries.map(entry => parseInt(entry.resource.valueQuantity.value, 10));
  const average = Math.round(values.reduce((a, b) => a + b) / values.length);

  return {
    name: getMeasurementName(code),
    min: Math.min(...values),
    max: Math.max(...values),
    average,
  };
}

function mapStateToProps(state, ownProps) {
  const { observationsByCode } = state;
  const data = [];

  Object.keys(observationsByCode).forEach((key) => {
    if (observationsByCode.hasOwnProperty(key)) {
      const observations = observationsByCode[key];
      if (observations.data && key !== '150020') {
        const entries = filterObservationsInRange(observations.data.entry,
          ownProps.fromDate, ownProps.toDate);
        data.push(calculateReportValues(entries, key));
      }
    }
  });

  return { data };
}

export default connect(mapStateToProps)(Report);
