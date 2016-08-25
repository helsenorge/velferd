import React from 'react';
import './pagemenu.scss';

const PageMenu = () => (
  <nav className="pagemenu">
    <ul className="pagemenu__list">
      <li className="pagemenu__link pagemenu__link--active">
        <div className="pagemenu__text">Egenvurdering og målinger</div>
      </li>
      <li className="pagemenu__link">
        <div className="pagemenu__text">Hendelser</div>
      </li>
      <li className="pagemenu__link">
        <div className="pagemenu__text">Egenbehandlingsplan</div>
      </li>
      <li className="pagemenu__link">
        <div className="pagemenu__text">Meldinger</div>
      </li>
    </ul>
  </nav>
);

export default PageMenu;
