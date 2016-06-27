import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/app.jsx';
import DashboardPage from './components/dashboard-page.jsx';
import HistoryPage from './components/history-page.jsx';
import CarePlan from './components/careplan-page.jsx';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={DashboardPage} />
    <Route path="history" component={HistoryPage} />
    <Route path="careplan" component={CarePlan} />
  </Route>
);
