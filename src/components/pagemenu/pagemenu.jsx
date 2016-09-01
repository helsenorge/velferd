import React from 'react';
import { Link, IndexLink } from 'react-router';
import './pagemenu.scss';

const PageMenu = () => (
  <nav className="pagemenu">
    <ul className="pagemenu__list">
      <li>
        <IndexLink
          to="/velferd"
          className="pagemenu__link"
          activeClassName="pagemenu__link--active"
        >
          <div className="pagemenu__text">
            Egenvurdering og målinger
          </div>
        </IndexLink>
      </li>
      <li className="pagemenu__link">
        <div className="pagemenu__text">Hendelser</div>
      </li>
      <li>
        <Link
          to="/velferd/careplan"
          className="pagemenu__link"
          activeClassName="pagemenu__link--active"
        >
          <div className="pagemenu__text">
            Egenbehandlingsplan
          </div>
        </Link>
      </li>
      <li className="pagemenu__link">
        <div className="pagemenu__text">Meldinger</div>
      </li>
    </ul>
  </nav>
);

export default PageMenu;
