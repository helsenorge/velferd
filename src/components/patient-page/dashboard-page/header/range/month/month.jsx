import React, { PropTypes } from 'react';
import classNames from 'classnames';
import './month.scss';
import { monthNames } from '../../../../../../constants/month-names';

const Month = ({ month, fromDate, toDate, activeRange, handleDateClick, selectedDate }) => {
  const monthName = monthNames[month];
  const dates = [];
  for (let d = new Date(fromDate);
    d.getTime() < toDate.getTime();
    d.setDate(d.getDate() + 1)) {
    if (d.getMonth() === month) {
      dates.push(new Date(d));
    }
  }
  const daysFromLast =
  (new Date(fromDate.getYear(), month + 1, 0).getDate()) - dates[0].getDate();

  const monthClasses = classNames('month', `month--${activeRange}`);
  const monthNameClasses = classNames('month__monthname',
    `month__monthname--${daysFromLast}`
  );
  const year = toDate.getFullYear();
  return (
    <div className={monthClasses}>
      <div className={monthNameClasses}>
        <div>{monthName}</div>
        <div className="month__year">{monthName === monthNames[0] ? year : null}</div>
      </div>
      <ol className="month__dates">
        {
          dates.map((date) => {
            const thisSelected = selectedDate && selectedDate.getTime() === date.getTime();
            const dateClasses =
              classNames('month__date', { 'month__date--active': thisSelected });
            return (
              <li
                key={date.getTime()}
                className={dateClasses}
                onClick={() => handleDateClick(date)}
              >
                {date.getDate()}.
              </li>
            );
          })
        }
      </ol>
    </div>
    );
};

Month.propTypes = {
  month: PropTypes.number.isRequired,
  activeRange: PropTypes.number.isRequired,
  fromDate: PropTypes.instanceOf(Date).isRequired,
  toDate: PropTypes.instanceOf(Date).isRequired,
  handleDateClick: PropTypes.func.isRequired,
  selectedDate: PropTypes.instanceOf(Date),
};

export default Month;
