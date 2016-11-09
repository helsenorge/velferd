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
  const daysFromLast =
  (new Date(fromDate.getYear(), month + 1, 0).getDate()) - dates[0].getDate();
  console.log(daysFromLast);

  const monthClasses = classNames('month', `month--${activeRange}`);
  const monthNameClasses = classNames('month__monthname',
    `month__monthname--${daysFromLast}`
  );
  return (
    <div className={monthClasses}>
      <div className={monthNameClasses}>{monthName}</div>
      <ol className="month__dates">
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
