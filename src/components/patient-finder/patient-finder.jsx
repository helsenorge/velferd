import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPatients, setActivePatient } from '../../actions/patient';
import { fetchCarePlan } from '../../actions/care-plan';
import TextInput from '../text-input/text-input.jsx';

class PatientsFinder extends Component {

  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.updateSearchString = this.updateSearchString.bind(this);
    this.state = { searchString: '' };
  }

  updateSearchString(event) {
    return this.setState({ searchString: event.target.value });
  }

  search() {
    const { dispatch, fhirUrl } = this.props;
    dispatch(fetchPatients(fhirUrl, this.state.searchString));
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.search();
    }
  }

  handlePatientClick(patient) {
    const { dispatch, fhirUrl } = this.props;
    dispatch(setActivePatient(patient));
    dispatch(fetchCarePlan(fhirUrl, patient.id));
  }

  groupPatientsByInitial(data) {
    if (!data || !data.entry) {
      return {};
    }

    const patientsByInitial = {};

    data.entry.forEach(entry => {
      const patient = entry.resource;
      let patientName;
      let initial = ' ';

      if (patient.name && patient.name.length > 0) {
        const name = patient.name[0];
        const given = name.given ? name.given.join(' ') : '';
        const family = name.family ? name.family.join(' ').trim() : '';
        patientName = `${family}, ${given}`;

        if (family) {
          initial = family.substring(0, 1);
        }
      }

      if (!patientsByInitial[initial]) {
        patientsByInitial[initial] = [];
      }

      patientsByInitial[initial].push(
        <li key={patient.id}>
          <button
            onClick={() => this.handlePatientClick(patient)}
          >
            {patientName} - {patient.id}
          </button>
        </li>
        );
    });

    return patientsByInitial;
  }

  render() {
    const { data } = this.props;
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

    return (
      <div>
        <h2>Velg pasient</h2>
        <TextInput
          name="searchInput"
          placeholder="Søk på navn"
          onChange={this.updateSearchString}
          onKeyPress={this.handleKeyPress}
          value={this.state.searchString}
        />
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
