import React, { PropTypes } from 'react';
import './text-area.scss';
import classNames from 'classnames';
const TextArea = ({ name, onChange, placeholder = '', value, disabled, className = '' }) => {
  const classes = classNames('textarea', className);
  return (
    <textarea
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
      className={classes}
    />
  );
};

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default TextArea;
