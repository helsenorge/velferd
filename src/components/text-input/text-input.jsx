import React, { PropTypes } from 'react';
import './text-input.scss';

const TextInput = ({ name, onChange, placeholder, value, disabled }) => (
  <input
    type="text"
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    disabled={disabled}
    className="text-input"
  />
);

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
};

export default TextInput;
