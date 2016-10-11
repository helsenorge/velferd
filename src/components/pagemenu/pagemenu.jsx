import React from 'react';
import { Link, IndexLink } from 'react-router';
import './pagemenu.scss';

const PageMenu = () => (
  <nav className="pagemenu">
    <ul className="pagemenu__list">
      <li className="pagemenu__list-item">
        <IndexLink
          to="/"
          className="pagemenu__link"
          activeClassName="pagemenu__link--active"
        >
            Egenvurdering og målinger
        </IndexLink>
      </li>
      <li className="pagemenu__list-item">
        <Link
          to="/careplan"
          className="pagemenu__link"
          activeClassName="pagemenu__link--active"
        >
            Egenbehandlingsplan
        </Link>
      </li>
    </ul>
  </nav>
);

export default PageMenu;
