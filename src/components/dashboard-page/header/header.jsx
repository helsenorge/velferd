import React, { PropTypes } from 'react';
import { formatDate } from '../../date-helpers/date-helpers.js';

const Header = ({ handleRangeClick, handleBackClick, handleForwardClick, fromDate, toDate }) => {
  const to = new Date(toDate.getTime());
  to.setDate(to.getDate() - 1);

  return (
    <header>
      <h2 className="dashboard__heading">Resultater</h2>
      <nav>
        <a onClick={() => handleRangeClick(7)}>7 days</a>
        {" | "}
        <a onClick={() => handleRangeClick(14)}>14 days</a>
        {" | "}
        <a onClick={() => handleRangeClick(30)}>30 days</a>
        {" | "}
        <a onClick={() => handleRangeClick(90)}>90 days</a>
      </nav>
      <nav>
        <a onClick={() => handleBackClick()}>&lt;&lt;&nbsp;&nbsp;</a>
        <span>{formatDate(fromDate)}</span>
        {" --- "}
        <span>{formatDate(to)}</span>
        <a onClick={() => handleForwardClick()}>&nbsp;&nbsp;&gt;&gt;</a>
      </nav>
    </header>
  );
};

Header.propTypes = {
  handleRangeClick: PropTypes.func.isRequired,
  handleForwardClick: PropTypes.func.isRequired,
  handleBackClick: PropTypes.func.isRequired,
  fromDate: PropTypes.instanceOf(Date).isRequired,
  toDate: PropTypes.instanceOf(Date).isRequired,
};

export default Header;
