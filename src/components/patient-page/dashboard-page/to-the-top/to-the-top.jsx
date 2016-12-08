import React, { Component } from 'react';
import Icon from '../../../icon/icon.jsx';
import iconArrow from '../../../../../svg/pil-venstre.svg';
import scrollTo from 'scroll-to';
import './to-the-top.scss';

class ToTheTop extends Component {

  scroll() {
    scrollTo(0, 0, {
      duration: 500,
    });
  }

  render() {
    return (
      <button className="to-the-top" onClick={this.scroll}>
        <Icon glyph={iconArrow} className="to-the-top__icon" />
        <span className="to-the-top__text">Til toppen</span>
      </button>
    );
  }
}

export default ToTheTop;
