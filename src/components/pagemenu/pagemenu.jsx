import React from 'react';
import './pagemenu.scss';

const PageMenu = () => (
  <nav className="pagemenu">
    <ul className="pagemenu__list">
      <li className="pagemenu__link pagemenu__link--active">Resultater</li>
      <li className="pagemenu__link">Hendelser</li>
      <li className="pagemenu__link">Egenbehandlingsplan</li>
      <li className="pagemenu__link">Meldinger</li>
    </ul>
  </nav>
);

export default PageMenu;
