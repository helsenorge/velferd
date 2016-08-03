import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/app.jsx';
import DashboardPage from './components/dashboard-page/dashboard-page.jsx';
import CarePlan from './components/careplan-page/careplan-page.jsx';

export default (
  <Route path="/velferd" component={App}>
    <IndexRoute component={DashboardPage} />
    <Route path="careplan" component={CarePlan} />
  </Route>
);
