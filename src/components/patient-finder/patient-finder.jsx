import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { setActivePatient,
  fetchAndSetActivePatient,
  fetchPatients,
  fetchPatientByIdentifier } from '../../actions/patient';
import { fetchCarePlan } from '../../actions/care-plan';
import { getBirthNumber, getName } from '../../helpers/patient-helpers.js';
import TextInput from '../text-input/text-input.jsx';
import './patient-finder.scss';
import Icon from '../icon/icon.jsx';
import mfglass from '../../../svg/magnifying_glass.svg';

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
    const { dispatch } = this.props;
    const { searchString } = this.state;
    const isPersonNumber = /^([0-9]){11}$/.test(searchString);

    if (isPersonNumber) {
      dispatch(fetchPatientByIdentifier(this.state.searchString));
    }
    else {
      dispatch(fetchPatients(this.state.searchString));
    }
  }

  handleKeyPress(event) {
    event.preventDefault();
    this.search();
  }

  handlePatientClick(patient, patientName) {
    const { dispatch } = this.props;
    const { lastViewed } = this.state;
    lastViewed[patient.id] = patientName;

    this.saveLastViewed(lastViewed);
    this.setState({ lastViewed });

    dispatch(setActivePatient(patient));
    dispatch(fetchCarePlan(patient.id));
  }

  handleLastViewedPatientClick(patientId) {
    const { dispatch } = this.props;

    dispatch(fetchAndSetActivePatient(patientId));
    dispatch(fetchCarePlan(patientId));
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
        <li key={patient.id} className="patient-finder__letter-list-item">
          <button
            onClick={() => this.handlePatientClick(patient, patientName)}
            className="patient-finder__person"
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
          <ul className="patient-finder__letters-list">
            <div key={key} className="patient-finder__letter">{key}</div>
            {patientsByInitial[key]}
          </ul>
          );
      }
    });
    const lettersClasses = classNames('patient-finder__letters', {
      'patient-finder__letters--columns': data !== null && data.entry.length > 12,
    });

    const recentlyViewed = [];

    Object.keys(lastViewed).sort().forEach((key) => {
      if (lastViewed.hasOwnProperty(key)) {
        recentlyViewed.push(
          <li key={key}>
            <button
              onClick={() => this.handleLastViewedPatientClick(key)}
              className="patient-finder__person"
            >
              {lastViewed[key]}
            </button>
          </li>
        );
      }
    });

    return (
      <div className="patient-finder">
        <h2 className="patient-finder__heading">Velg pasient</h2>

        <section>
          <h3 className="patient-finder__recent-heading">Nylig sett på</h3>
          <ul className="patient-finder__list">{recentlyViewed}</ul>
        </section>

        <section>
          <form onSubmit={this.handleKeyPress} className="patient-finder__search">
            <TextInput
              className="patient-finder__search-input"
              name="searchInput"
              placeholder="Søk på navn eller personnummer"
              onChange={this.updateSearchString}
              value={this.state.searchString}
            />
            <button type="submit" className="patient-finder__submit">
              <Icon glyph={mfglass} className="patient-finder__icon" />
            </button>
          </form>
          <div>
            {this.props.isFetching ? <span>fetching</span> :
              <div className={lettersClasses}>{groups}</div>}
          </div>
        </section>
      </div>
    );
  }
}

PatientsFinder.propTypes = {
  dispatch: PropTypes.func.isRequired,
  data: PropTypes.object,
  isFetching: PropTypes.bool,
};

function mapStateToProps(state) {
  const { patient } = state;
  const { data, isFetching } = patient;

  return {
    data,
    isFetching,
  };
}

export default connect(mapStateToProps)(PatientsFinder);
