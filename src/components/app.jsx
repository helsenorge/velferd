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
      dispatch(fetchPatient(fhirUrl, patientId, token));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, fhirUrl, patientId, authenticate, token, data } = nextProps;

    if (this.accessAllowed(authenticate, token) && data === null) {
      dispatch(fetchPatient(fhirUrl, patientId, token));
    }
  }

  accessAllowed(authenticate, token) {
    return !authenticate || token !== null;
  }

  render() {
    const { data, authenticate, token } = this.props;

    if (!this.accessAllowed(authenticate, token)) {
      return (<Login hash={this.props.location.hash} />);
    }

    return (
      <div>
        <div className="flexcontainer">
          <PageMenu />
          <div>
            <PageHeader patient={data} />
            <article className="main">
              {this.props.children}
            </article>
          </div>
        </div>
        <Footer fhirUrl={this.props.fhirUrl} />
      </div>
    );
  }
}

App.propTypes = {
  authenticate: PropTypes.bool.isRequired,
  fhirUrl: PropTypes.string.isRequired,
  patientId: PropTypes.string.isRequired,
  data: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.object,
  token: PropTypes.string,
  location: PropTypes.object,
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
    authenticate,
    fhirUrl,
    patientId,
    data,
    isFetching,
  };
}

export default connect(
  mapStateToProps,
)(App);
