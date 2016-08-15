import React, { PropTypes } from 'react';

const Icon = ({ className = 'icon', glyph, width = 16, height = 16 }) => (
  <svg className={className} width={width} height={height}>
    <use xlinkHref={glyph} />
  </svg>
);

Icon.propTypes = {
  className: PropTypes.string,
  glyph: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default Icon;
