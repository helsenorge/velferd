import React from 'react';
import './footer.scss';
import Button from '../../../button/button.jsx';
const Footer = () => (
  <div className="footer">
    <div className="footer__lastupdated">
      Sist oppdatert: 30.02.2016 kl. 11.34 av Anna For Eieb (lege)
    </div>
    <p>Økt dose for Burinex, alvorlig forverring</p>
    <Button className="footer__button">Kopier kommentar</Button>
  </div>
);

export default Footer;
