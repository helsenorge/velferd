import React, { PropTypes } from 'react';

const TextArea = ({ name, onChange, value, disabled, className = '' }) => (
  <textarea
    name={name}
    value={value}
    onChange={onChange}
    disabled={disabled}
    className={className}
  />
);

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default TextArea;
