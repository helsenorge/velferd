import React, { PropTypes } from 'react';
import classNames from 'classnames';
import './button.scss';

const Button = ({ className, onClick, children, lvl2, lvl3, square, ...props }) => {
  const classes = classNames({
    button: true,
    'button--lvl2': lvl2,
    'button--lvl3': lvl3,
    'button--square': square,
  }, className);
  return (
    <button className={classes} onClick={onClick} {...props}>{children}</button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.any,
  lvl2: PropTypes.bool,
  lvl3: PropTypes.bool,
  square: PropTypes.bool,
};

export default Button;
