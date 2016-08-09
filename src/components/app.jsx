import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPatient } from '../actions/patient';
import Header from './header/header.jsx';
import Footer from './footer/footer.jsx';

class App extends Component {

  componentDidMount() {
    const { dispatch, fhirUrl, patientId } = this.props;
    dispatch(fetchPatient(fhirUrl, patientId));
  }

  render() {
    const { data } = this.props;
    return (
      <div>
        <Header patient={data} />
        {this.props.children}
        <Footer fhirUrl={this.props.fhirUrl} />
      </div>
    );
  }
}

App.propTypes = {
  fhirUrl: PropTypes.string.isRequired,
  patientId: PropTypes.string.isRequired,
  data: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { patient, settings } = state;
  const {
    isFetching,
    data,
  } = patient || {
    isFetching: true,
    data: null,
  };

  const { fhirUrl, patientId } = settings;

  return {
    fhirUrl,
    patientId,
    data,
    isFetching,
  };
}

export default connect(
  mapStateToProps,
)(App);
