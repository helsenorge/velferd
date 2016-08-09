import React, { PropTypes } from 'react';
import ZoomButtons from './zoombuttons/zoombuttons.jsx';
import Range from './range/range.jsx';
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

  return (
    <header className="dashboard-header">
      <h2 className="dashboard-header__heading">Resultater</h2>
      <ZoomButtons
        handleRangeClick={handleRangeClick}
      />
      <Range
        handleBackClick={handleBackClick}
        handleSingleBackClick={handleSingleBackClick}
        handleForwardClick={handleForwardClick}
        handleSingleForwardClick={handleSingleForwardClick}
        fromDate={fromDate}
        toDate={toDate}
      />
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
