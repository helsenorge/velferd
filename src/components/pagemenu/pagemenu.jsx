import React from 'react';
import { Link, IndexLink } from 'react-router';
import './pagemenu.scss';

const PageMenu = () => (
  <nav className="pagemenu">
    <ul className="pagemenu__list">
      <li className="pagemenu__list-item">
        <IndexLink
          to="/velferd"
          className="pagemenu__link"
          activeClassName="pagemenu__link--active"
        >
            Egenvurdering og målinger
        </IndexLink>
      </li>
      <li className="pagemenu__list-item">
        <a href="#" className="pagemenu__link">Hendelser</a>
      </li>
      <li className="pagemenu__list-item">
        <Link
          to="/velferd/careplan"
          className="pagemenu__link"
          activeClassName="pagemenu__link--active"
        >
            Egenbehandlingsplan
        </Link>
      </li>
      <li className="pagemenu__list-item">
        <a href="#" className="pagemenu__link">Meldinger</a>
      </li>
    </ul>
  </nav>
);

export default PageMenu;
