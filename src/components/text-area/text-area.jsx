import React, { PropTypes } from 'react';

const TextArea = ({ name, onChange, value, disabled }) => (
  <textarea
    name={name}
    value={value}
    onChange={onChange}
    disabled={disabled}
  />
);

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
};

export default TextArea;
