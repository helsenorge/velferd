import React, { PropTypes } from 'react';
import './lightbox.scss';
import Icon from '../icon/icon.jsx';
import iconPlus from '../../../svg/plus.svg';

const Lightbox = ({ onClose, children, className = '' }) => (
  <div className="lightbox">
    <div className="lightbox__container">
      <button onClick={onClose} className="lightbox__close-button">
        <Icon glyph={iconPlus} className="lightbox__close-button-icon" />
        <span className="lightbox__close-button-text">Lukk</span>
      </button>
      <div className={className}>
        {children}
      </div>
    </div>
  </div>
  );

Lightbox.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.any,
  className: PropTypes.string,
};

export default Lightbox;
