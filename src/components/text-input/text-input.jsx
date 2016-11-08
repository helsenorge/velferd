import React, { PropTypes } from 'react';
import './text-input.scss';
import classNames from 'classnames';

const TextInput = ({ name, onChange, onKeyPress,
    placeholder, value, disabled, className = '' }) => {
  const classes = classNames('text-input', className);
  return (
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      disabled={disabled}
      className={classes}
    />
    );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default TextInput;
