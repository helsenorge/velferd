import React from 'react';
import ZoomButtons from './zoombuttons/zoombuttons.jsx';
import Range from './range/range.jsx';
import './header.scss';

const Header = (props) => (
  <header className="dashboard-header">
    <h2 className="dashboard-header__heading">Resultater</h2>
    <ZoomButtons {...props} />
    <Range {...props} />
  </header>
);

export default Header;
