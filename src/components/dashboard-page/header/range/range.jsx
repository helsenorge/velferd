import React, { PropTypes } from 'react';
import { formatDate } from '../../../date-helpers/date-helpers.js';
import './range.scss';

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

  for (let d = new Date(fromDate); d.getTime() < toDate.getTime(); d.setDate(d.getDate() + 1)) {
    dates.push(new Date(d));
  }

  const dateButtons = dates.map((date) => (
    <button className="range__button">
      {formatDate(date)}
    </button>
  ));

  return (
    <nav className="range">
      <button
        className="range__button range__button--rev"
        onClick={() => handleBackClick()}
      />
      <button
        className="range__button range__button--rev-single"
        onClick={() => handleSingleBackClick()}
      />
      {dateButtons}
      <button
        className="range__button range__button--fwd-single"
        onClick={() => handleSingleForwardClick()}
      />
      <button
        className="range__button range__button--fwd"
        onClick={() => handleForwardClick()}
      />
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
