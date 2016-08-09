import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPatient } from '../actions/patient';
import PageHeader from '../components/pageheader/pageheader.jsx';
import PageMenu from '../components/pagemenu/pagemenu.jsx';
import Footer from '../components/footer/footer.jsx';
import './app.scss';

class App extends Component {

  componentDidMount() {
    const { dispatch, fhirUrl, patientId } = this.props;
    dispatch(fetchPatient(fhirUrl, patientId));
  }

  render() {
    const { data } = this.props;
    return (
      <div>
        <PageHeader patient={data} />
        <div className="flexcontainer">
          <PageMenu />
          {this.props.children}
        </div>
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
