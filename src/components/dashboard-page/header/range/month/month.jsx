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

  const dateClasses = classNames('month__dates', `month__dates--${activeRange}`);
  return (
    <div className="month">
      <div className="month__monthname">{monthName}</div>
      <ol className={dateClasses}>
        {
          dates.map((date) => {
            const dateObj = new Date(date);
            return (<li key={dateObj.getTime()} className="month__date">{dateObj.getDate()}.</li>);
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
};

export default Month;
