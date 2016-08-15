import React, { PropTypes } from 'react';

const Footer = function Footer(props) {
  const api = `API: ${props.fhirUrl}`;
  return (
    <footer>
      <small>{api}</small>
    </footer>
  );
};

Footer.propTypes = {
  fhirUrl: PropTypes.string.isRequired,
};

export default Footer;
