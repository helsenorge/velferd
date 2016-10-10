import React, { PropTypes } from 'react';
import './footer.scss';
import Button from '../../../button/button.jsx';
const Footer = ({ comment }) => (
  <div className="footer">
    <div className="footer__lastupdated">
      Sist endret 30.02.2016 kl. 11.34 av Anna For Eieb (lege)
    </div>
    <p className="footer__comment">Kommentar: {comment}</p>
    <Button className="footer__button">Kopier kommentar</Button>
  </div>
);

Footer.propTypes = {
  comment: PropTypes.string.isRequired,
};


export default Footer;
