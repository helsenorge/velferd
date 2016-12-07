import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app.jsx';
import DashboardPage from './components/dashboard-page/dashboard-page.jsx';
import CarePlan from './components/care-plan-page/care-plan-page.jsx';
import PatientFinder from './components/patient-finder-page/patient-finder-page.jsx';
import Patient from './components/patient-page/patient-page.jsx';
const AccessToken = () => (null);

export default (
  <Route path="/" component={App}>
    <IndexRoute component={PatientFinder} />
    <Route path="patient" component={Patient}>
      <IndexRoute component={DashboardPage} />
      <Route path="careplan" component={CarePlan} />
    </Route>
    <Route path="access_token=*" component={AccessToken} />
  </Route>
);
