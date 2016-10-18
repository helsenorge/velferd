import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPatient } from '../actions/patient';
import PageHeader from '../components/pageheader/pageheader.jsx';
import PageMenu from '../components/pagemenu/pagemenu.jsx';
import Footer from '../components/footer/footer.jsx';
import Login from '../components/login/login.jsx';
import './app.scss';

class App extends Component {

  componentDidMount() {
    const { dispatch, fhirUrl, patientId, authenticate, token } = this.props;

    if (this.accessAllowed(authenticate, token)) {
      dispatch(fetchPatient(fhirUrl, patientId));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, fhirUrl, patientId, authenticate, token, patient } = nextProps;

    if (this.accessAllowed(authenticate, token) && patient === null) {
      dispatch(fetchPatient(fhirUrl, patientId));
    }
  }

  accessAllowed(authenticate, token) {
    return !authenticate || token !== null;
  }

  render() {
    const { patient, authenticate, token, isFetching, user } = this.props;

    if (!this.accessAllowed(authenticate, token)) {
      return (<Login />);
    }

    let markup = null;

    if (isFetching) {
      markup = (<h2>Loading...</h2>);
    }
    else if (patient) {
      markup = (
        <div>
          <PageHeader patient={patient} user={user} />
          <PageMenu />
          <article className="main">
            {this.props.children}
          </article>
          <Footer fhirUrl={this.props.fhirUrl} />
        </div>
      );
    }

    return markup;
  }
}

App.propTypes = {
  authenticate: PropTypes.bool.isRequired,
  fhirUrl: PropTypes.string.isRequired,
  patientId: PropTypes.string.isRequired,
  patient: PropTypes.object,
  user: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.object,
  token: PropTypes.string,
};

function mapStateToProps(state) {
  const { patient, settings, auth } = state;
  const {
    isFetching,
    data,
  } = patient || {
    isFetching: true,
    data: null,
  };

  const { authenticate, fhirUrl, patientId } = settings;

  return {
    token: auth.token,
    user: auth.user,
    authenticate,
    fhirUrl,
    patientId,
    patient: data,
    isFetching,
  };
}

export default connect(
  mapStateToProps,
)(App);
