import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getCategory } from '../helpers/care-plan-helpers.js';
import PageHeader from '../components/pageheader/pageheader.jsx';
import Footer from '../components/footer/footer.jsx';
import Login from '../components/login/login.jsx';

import './app.scss';

class App extends Component {
  accessAllowed(authenticate, token) {
    return !authenticate || token !== null;
  }

  render() {
    const { activePatient, authenticate, token, user, carePlanCategory, children } = this.props;

    if (!this.accessAllowed(authenticate, token)) {
      return (<Login />);
    }

    return (
      <div>
        <PageHeader
          patient={activePatient}
          user={user} carePlanCategory={carePlanCategory}
        />
        <article className="main">
          {children}
        </article>
        <Footer fhirUrl={this.props.fhirUrl} />
      </div>
      );
  }
}

App.propTypes = {
  authenticate: PropTypes.bool.isRequired,
  fhirUrl: PropTypes.string.isRequired,
  activePatient: PropTypes.object,
  user: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.object,
  token: PropTypes.string,
  carePlanCategory: PropTypes.string,
};

function mapStateToProps(state) {
  const { patient, settings, auth, carePlan } = state;
  const { activePatient } = patient;

  let carePlanCategory;
  if (carePlan.data !== null
    && carePlan.data.resourceType === 'Bundle'
    && carePlan.data.total > 0) {
    carePlanCategory = getCategory(carePlan.data.entry[0].resource);
  }

  const { authenticate, fhirUrl } = settings;

  return {
    token: auth.token,
    user: auth.user,
    authenticate,
    fhirUrl,
    carePlanCategory,
    activePatient,
  };
}

export default connect(
  mapStateToProps,
)(App);
