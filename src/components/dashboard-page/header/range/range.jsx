import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import { getMonth, getDate, calculateDateRange, getNumberofColumnsinChart }
  from '../../../../helpers/date-helpers.js';
import './range.scss';
import Icon from '../../../icon/icon.jsx';
import chevron from '../../../../../svg/chevron-left.svg';

class Range extends Component {
  constructor(props) {
    super(props);
    this.state = { sticky: false };
    this.scrollListener = this.scrollListener.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollListener);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollListener);
  }

  scrollListener(evt) {
    if (evt.target.scrollingElement.scrollTop > 235) {
      this.setState({ sticky: true });
    }
    else {
      this.setState({ sticky: false });
    }
  }

  render() {
    const {
      handleSingleBackClick,
      handleSingleForwardClick,
      handleDateClick,
      fromDate,
      toDate,
      activeRange,
    } = this.props;

    const to = new Date(toDate.getTime());
    to.setDate(to.getDate() - 1);

    const dates = [];

    const dateRange = calculateDateRange(fromDate, toDate);
    const cols = getNumberofColumnsinChart(dateRange);
    const valuesPerCell = Math.floor(dateRange / cols);

    for (let d = new Date(fromDate);
      d.getTime() < toDate.getTime(); d.setDate(d.getDate() + valuesPerCell)) {
      dates.push(new Date(d));
    }

    const dateButtons = dates.map((date, index) => (
      <button className="range__button" key={index} onClick={() => handleDateClick(date)}>
        <div className="range__date">{getDate(date)}.</div>
        <div className="range__month">{getMonth(date)}</div>
      </button>
    ));
    const rangeClasses = classNames({
      range: true,
      'range--sticky': this.state.sticky,
    });
    const rangeDateClasses = classNames(
      'range__date-buttons',
      `range__date-buttons--${activeRange}`
    );
    return (
      <nav className={rangeClasses}>
        <div className="range__controls">
          <button
            className="range__button range__button--rev"
            onClick={() => handleSingleBackClick()}
          >
            <Icon glyph={chevron} />
            Forrige
          </button>
        </div>

        <div className={rangeDateClasses}>
          {dateButtons}
        </div>

        <div className="range__controls">
          <button
            className="range__button range__button--fwd"
            onClick={() => handleSingleForwardClick()}
          >
            Neste
            <Icon glyph={chevron} />
          </button>
        </div>
      </nav>
      );
  }
}

Range.propTypes = {
  handleSingleForwardClick: React.PropTypes.func.isRequired,
  handleSingleBackClick: React.PropTypes.func.isRequired,
  handleDateClick: PropTypes.func.isRequired,
  fromDate: PropTypes.instanceOf(Date).isRequired,
  toDate: PropTypes.instanceOf(Date).isRequired,
  activeRange: PropTypes.number.isRequired,
};

export default Range;
