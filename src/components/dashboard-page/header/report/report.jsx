import React, { Component, PropTypes } from 'react';
import './report.scss';
import Collapse from 'react-collapse';
import iconChevron from '../../../../../svg/chevron-left.svg';
import Icon from '../../../icon/icon.jsx';
import classNames from 'classnames';
import { formatDate } from '../../../../helpers/date-helpers.js';

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
              Oppsummering for&nbsp;
               {formatDate(this.props.fromDate)} - {formatDate(this.props.toDate)} 2016
            </h3>
            <p className="report__paragraph">
              <b>Blodtrykk</b> har variert mellom [min-verdi] og
               [max-verdi] og har et gjennomsnitt på [gjennomsnittlig verdi].
            </p>
            <p className="report__paragraph">
              <b>Puls</b> har variert mellom [min-verdi] og
               [max-verdi] og har et gjennomsnittlig på [gjennomsnittlig verdi].
            </p>
            <p className="report__paragraph">
              Andel grønne smilefjes: 80%, oransje: 15% og røde: 5%.
            </p>
            <p className="report__paragraph">
              4. august ble det startet en antibiotikakur med xx.
            </p>
          </div>
        </Collapse>
      </div>
      );
  }
}

Report.propTypes = {
  fromDate: PropTypes.instanceOf(Date).isRequired,
  toDate: PropTypes.instanceOf(Date).isRequired,
};

export default Report;
