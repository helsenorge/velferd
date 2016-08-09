import React, { PropTypes } from 'react';
import './header.scss';

const Header = () => (
  <header className="pageheader">
    <h1>Avstandsoppfølging</h1>
  </header>
);

Header.propTypes = {
  patient: PropTypes.object,
};

export default Header;
