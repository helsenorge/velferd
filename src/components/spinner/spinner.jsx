import React, { PropTypes } from 'react';
import './spinner.scss';
import classNames from 'classnames';

const Spinner = ({ className }) => {
  const classes = classNames('spinner-wrapper', className);
  return (
    <div className={classes}>
      <div className="spinner">
        <div className="s1"></div>
        <div className="s2"></div>
        <div className="s3"></div>
        <div className="s4"></div>
        <div className="s5"></div>
        <div className="s6"></div>
        <div className="s7"></div>
        <div className="s8"></div>
      </div>
    </div>
  );
};

export default Spinner;

Spinner.propTypes = {
  className: PropTypes.string,
};
