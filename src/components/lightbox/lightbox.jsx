import React, { PropTypes, Component } from 'react';
import './lightbox.scss';
import Icon from '../icon/icon.jsx';
import iconPlus from '../../../svg/plus.svg';

class Lightbox extends Component {
  componentDidMount() {
    document.body.classList.add('noscroll');
  }

  componentWillUnmount() {
    document.body.classList.remove('noscroll');
  }

  render() {
    return (
      <div className="lightbox">
        <div className="lightbox__container">
          <button onClick={this.props.onClose} className="lightbox__close-button">
            <Icon glyph={iconPlus} className="lightbox__close-button-icon" />
            <span className="lightbox__close-button-text">Lukk</span>
          </button>
          <div className={this.propsclassName}>
            {this.props.children}
          </div>
        </div>
      </div>
      );
  }
}

Lightbox.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.any,
  className: PropTypes.string,
};

export default Lightbox;
