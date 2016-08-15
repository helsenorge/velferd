import React, { PropTypes } from 'react';
import { getMonth, getDate, calculateDateRange, getNumberofColumnsinChart }
  from '../../../../helpers/date-helpers.js';
import './range.scss';
import Icon from '../../../icon/icon.jsx';
import chevron from '../../../../../svg/chevron-left.svg';

const Range = (props) => {
  const {
    handleBackClick,
    handleSingleBackClick,
    handleForwardClick,
    handleSingleForwardClick,
    fromDate,
    toDate,
  } = props;

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
    <button className="range__button" key={index}>
      <div className="range__date">{getDate(date)}.</div>
      <div className="range__month">{getMonth(date)}</div>
    </button>
  ));

  return (
    <nav className="range">
      <div className="range__controls">
        <button
          className="range__button range__button--rev"
          onClick={() => handleBackClick()}
        >
          <Icon glyph={chevron} />
          <Icon glyph={chevron} />
        </button>

        <button
          className="range__button range__button--rev"
          onClick={() => handleSingleBackClick()}
        >
          <Icon glyph={chevron} />
        </button>
      </div>

      <div className="range__date-buttons">
        {dateButtons}
      </div>

      <div className="range__controls">
        <button
          className="range__button range__button--fwd"
          onClick={() => handleSingleForwardClick()}
        >
          <Icon glyph={chevron} />
        </button>

        <button
          className="range__button range__button--fwd"
          onClick={() => handleForwardClick()}
        >
          <Icon glyph={chevron} />
          <Icon glyph={chevron} />
        </button>
      </div>
    </nav>
    );
};

Range.propTypes = {
  handleForwardClick: React.PropTypes.func.isRequired,
  handleSingleForwardClick: React.PropTypes.func.isRequired,
  handleBackClick: React.PropTypes.func.isRequired,
  handleSingleBackClick: React.PropTypes.func.isRequired,
  fromDate: PropTypes.instanceOf(Date).isRequired,
  toDate: PropTypes.instanceOf(Date).isRequired,
};

export default Range;
