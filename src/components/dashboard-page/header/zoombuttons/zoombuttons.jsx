import React, { PropTypes } from 'react';
import './zoombuttons.scss';
import { dateranges } from '../../../../constants/date-ranges.js';
import classNames from 'classnames';

const ZoomButtons = ({ handleRangeClick, activeRange }) => {
  const buttons = dateranges.map((range, index) => {
    const className = classNames({
      zoombuttons__button: true,
      'zoombuttons__button--active': range === activeRange,
    });
    return (<button
      className={className}
      onClick={() => handleRangeClick(range)}
      key={index}
    >
      {range} dager
    </button>);
  });

  return (
    <nav className="zoombuttons">
      {buttons}
    </nav>
    );
};

ZoomButtons.propTypes = {
  handleRangeClick: PropTypes.func.isRequired,
  activeRange: PropTypes.number.isRequired,
};

export default ZoomButtons;
