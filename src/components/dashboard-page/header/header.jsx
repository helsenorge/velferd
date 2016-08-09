import React, { PropTypes } from 'react';
import { formatDate } from '../../date-helpers/date-helpers.js';
import ZoomButtons from './zoombuttons/zoombuttons.jsx';
import './header.scss';

const Header = (props) => {
  const {
    handleRangeClick,
    handleBackClick,
    handleForwardClick,
    handleSingleBackClick,
    handleSingleForwardClick,
    fromDate,
    toDate } = props;
  const to = new Date(toDate.getTime());
  to.setDate(to.getDate() - 1);

  return (
    <header className="dashboard-header">
      <h2 className="dashboard-header__heading">Resultater</h2>
      <ZoomButtons
        handleRangeClick={handleRangeClick}
      />
      <nav>
        <a onClick={() => handleBackClick()}>&lt;&lt;&nbsp;&nbsp;</a>
        <a onClick={() => handleSingleBackClick()}>&lt;&nbsp;&nbsp;</a>
        <span>{formatDate(fromDate)}</span>
        {" --- "}
        <span>{formatDate(to)}</span>
        <a onClick={() => handleSingleForwardClick()}>&nbsp;&nbsp;&gt;</a>
        <a onClick={() => handleForwardClick()}>&nbsp;&nbsp;&gt;&gt;</a>
      </nav>
    </header>
  );
};

Header.propTypes = {
  handleRangeClick: PropTypes.func.isRequired,
  handleForwardClick: PropTypes.func.isRequired,
  handleBackClick: PropTypes.func.isRequired,
  handleSingleBackClick: PropTypes.func.isRequired,
  handleSingleForwardClick: PropTypes.func.isRequired,
  fromDate: PropTypes.instanceOf(Date).isRequired,
  toDate: PropTypes.instanceOf(Date).isRequired,
};

export default Header;
