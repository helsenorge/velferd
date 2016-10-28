import React, { PropTypes } from 'react';
import Icon from '../icon/icon.jsx';
import ehelselogo from '../../../svg/Direktoratet_for_e-helse_horisontal_logo_RGB_sort.svg';
import './footer.scss';

const Footer = function Footer(props) {
  const api = `API: ${props.fhirUrl}`;
  return (
    <footer className="footer">
      Tjenesten er levert av: <Icon glyph={ehelselogo} className="footer__icon" /><br />
      <small>{api}</small>
    </footer>
  );
};

Footer.propTypes = {
  fhirUrl: PropTypes.string.isRequired,
};

export default Footer;
