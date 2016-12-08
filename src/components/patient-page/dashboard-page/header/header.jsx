import React from 'react';
import ZoomButtons from './zoombuttons/zoombuttons.jsx';
import Range from './range/range.jsx';
import Report from './report/report.jsx';
import Goal from '../../../goal/goal.jsx';
import './header.scss';

const Header = (props) => (
  <header className="dashboard-header">
    <h2 className="dashboard-header__heading">Egenvurdering og målinger</h2>
    <Goal editing={false} {...props} />
    <div className="dashboard-header__zoomline">
      <ZoomButtons {...props} />
    </div>
    <Range {...props} />
    <Report {...props} />
  </header>
);

export default Header;
