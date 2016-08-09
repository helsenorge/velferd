import React, { PropTypes } from 'react';
import './zoombuttons.scss';
import { dateranges } from '../../../../constants/date-ranges.js';

const ZoomButtons = ({ handleRangeClick }) => {
  const buttons = dateranges.map((range, index) => (
    <button
      className="zoombuttons__button"
      onClick={() => handleRangeClick(range)}
      key={index}
    >
      {range} dager
    </button>
    ));
  return (
    <nav className="zoombuttons">
      {buttons}
    </nav>
    );
};

ZoomButtons.propTypes = {
  handleRangeClick: PropTypes.func.isRequired,
};

export default ZoomButtons;
