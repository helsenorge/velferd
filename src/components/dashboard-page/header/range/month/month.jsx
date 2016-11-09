import React, { PropTypes } from 'react';
import classNames from 'classnames';
import './month.scss';

const monthNames = [
  'januar',
  'februar',
  'mars',
  'april',
  'mai',
  'juni',
  'juli',
  'august',
  'september',
  'oktober',
  'november',
  'desember',
];

const Month = ({ month, fromDate, toDate, activeRange }) => {
  const monthName = monthNames[month];
  const dates = [];
  for (let d = new Date(fromDate);
    d.getTime() < toDate.getTime();
    d.setDate(d.getDate() + 1)) {
    if (d.getMonth() === month) {
      dates.push(new Date(d));
    }
  }

  const isSecondLastDayOfMonth = dates[0].getDate()
    === new Date(fromDate.getYear(), month + 1, 0).getDate() - 1;

  const isLastDayOfMonth = dates[0].getDate()
    === new Date(fromDate.getYear(), month + 1, 0).getDate();

  const dateClasses = classNames('month__dates', `month__dates--${activeRange}`);
  const monthNameClasses = classNames({
    month__monthname: true,
    'month__monthname--secondlast': isSecondLastDayOfMonth,
    'month__monthname--last': isLastDayOfMonth,
  });
  return (
    <div className="month">
      <div className={monthNameClasses}>{monthName}</div>
      <ol className={dateClasses}>
        {
          dates.map((date) => (
            <li key={date.getTime()} className="month__date">{date.getDate()}.</li>
            )
          )
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
};

export default Month;
