import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setActivePatient,
  fetchAndSetActivePatient,
  fetchPatients,
  fetchPatientByIdentifier } from '../../actions/patient';
import { fetchCarePlan } from '../../actions/care-plan';
import { getBirthNumber, getName } from '../../helpers/patient-helpers.js';
import TextInput from '../text-input/text-input.jsx';

class PatientsFinder extends Component {

  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.updateSearchString = this.updateSearchString.bind(this);
    this.state = { searchString: '', lastViewed: this.loadLastViewed() };
  }

  loadLastViewed() {
    try {
      const serializedPatients = localStorage.getItem('lastViewed');
      if (serializedPatients === null) {
        return {};
      }
      return JSON.parse(serializedPatients);
    }
    catch (e) {
      return {};
    }
  }

  saveLastViewed(lastViewed) {
    try {
      const serializedPatients = JSON.stringify(lastViewed);
      localStorage.setItem('lastViewed', serializedPatients);
    }
    catch (e) {
      // Ignore write errors.
    }
  }

  updateSearchString(event) {
    return this.setState({ searchString: event.target.value });
  }

  search() {
    const { dispatch, fhirUrl } = this.props;
    const { searchString } = this.state;
    const isPersonNumber = /^([0-9]){11}$/.test(searchString);

    if (isPersonNumber) {
      dispatch(fetchPatientByIdentifier(fhirUrl, this.state.searchString));
    }
    else {
      dispatch(fetchPatients(fhirUrl, this.state.searchString));
    }
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.search();
    }
  }

  handlePatientClick(patient, patientName) {
    const { dispatch, fhirUrl } = this.props;
    const { lastViewed } = this.state;
    lastViewed[patient.id] = patientName;

    this.saveLastViewed(lastViewed);
    this.setState({ lastViewed });

    dispatch(setActivePatient(patient));
    dispatch(fetchCarePlan(fhirUrl, patient.id));
  }

  handleLastViewedPatientClick(patientId) {
    const { dispatch, fhirUrl } = this.props;

    dispatch(fetchAndSetActivePatient(fhirUrl, patientId));
    dispatch(fetchCarePlan(fhirUrl, patientId));
  }

  groupPatientsByInitial(data) {
    if (!data || !data.entry) {
      return {};
    }

    const patientsByInitial = {};

    data.entry.forEach(entry => {
      const patient = entry.resource;
      const patientName = getName(patient);
      const initial = patientName ? patientName.substring(0, 1) : ' ';
      const birthNumber = getBirthNumber(patient);

      if (!patientsByInitial[initial]) {
        patientsByInitial[initial] = [];
      }

      patientsByInitial[initial].push(
        <li key={patient.id}>
          <button
            onClick={() => this.handlePatientClick(patient, patientName)}
          >
            {patientName} - {birthNumber}
          </button>
        </li>
        );
    });

    return patientsByInitial;
  }

  render() {
    const { data } = this.props;
    const { lastViewed } = this.state;
    const patientsByInitial = this.groupPatientsByInitial(data);
    const groups = [];

    Object.keys(patientsByInitial).sort().forEach((key) => {
      if (patientsByInitial.hasOwnProperty(key)) {
        groups.push(
          <div key={key}>
            <h2>{key}</h2>
            <ul>
              {patientsByInitial[key]}
            </ul>
          </div>
        );
      }
    });

    const recentlyViewed = [];

    Object.keys(lastViewed).sort().forEach((key) => {
      if (lastViewed.hasOwnProperty(key)) {
        recentlyViewed.push(
          <li key={key}>
            <button onClick={() => this.handleLastViewedPatientClick(key)}>
              {lastViewed[key]}
            </button>
          </li>
        );
      }
    });

    return (
      <div>
        <h2>Velg pasient</h2>
        <TextInput
          name="searchInput"
          placeholder="Søk på navn eller personnummer"
          onChange={this.updateSearchString}
          onKeyPress={this.handleKeyPress}
          value={this.state.searchString}
        />
        <h3>Nylig sett på</h3>
        <ul>{recentlyViewed}</ul>
        {groups}
      </div>
    );
  }
}

PatientsFinder.propTypes = {
  dispatch: PropTypes.func.isRequired,
  fhirUrl: PropTypes.string.isRequired,
  data: PropTypes.object,
};

function mapStateToProps(state) {
  const { patient, settings } = state;
  const { data } = patient;
  const { fhirUrl } = settings;

  return {
    fhirUrl,
    data,
  };
}

export default connect(mapStateToProps)(PatientsFinder);
