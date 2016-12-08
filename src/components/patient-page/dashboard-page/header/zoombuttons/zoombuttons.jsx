import React, { PropTypes } from 'react';
import './zoombuttons.scss';
import { dateranges } from '../../../../../constants/date-ranges.js';
import classNames from 'classnames';

const ZoomButtons = ({ handleRangeClick, activeRange }) => {
  const buttons = dateranges.map((range, index) => {
    const className = classNames({
      zoombuttons__button: true,
      'zoombuttons__button--active': range === activeRange,
    });
    let rangeString = '';
    switch (range) {
    case 14:
      rangeString = '2 uker';
      break;
    case 30:
      rangeString = '1 måned';
      break;
    case 90:
      rangeString = '3 måneder';
      break;
    case 180:
      rangeString = '6 måneder';
      break;
    default:
      rangeString = '';
      break;
    }
    return (<button
      className={className}
      onClick={() => handleRangeClick(range)}
      key={index}
    >
      {rangeString}
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
