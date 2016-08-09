import React, { PropTypes } from 'react';
import { formatDate } from '../../../date-helpers/date-helpers.js';

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

  return (
    <nav>
      <a onClick={() => handleBackClick()}>&lt;&lt;&nbsp;&nbsp;</a>
      <a onClick={() => handleSingleBackClick()}>&lt;&nbsp;&nbsp;</a>
      <span>{formatDate(fromDate)}</span>
      {" --- "}
      <span>{formatDate(to)}</span>
      <a onClick={() => handleSingleForwardClick()}>&nbsp;&nbsp;&gt;</a>
      <a onClick={() => handleForwardClick()}>&nbsp;&nbsp;&gt;&gt;</a>
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
