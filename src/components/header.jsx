import React, { PropTypes, Component } from 'react';

class Header extends Component {

  getPatientName(patient) {
    return `${patient.name[0].family[0]} ${patient.name[0].given[0]}`;
  }

  render() {
    let name = '';
    if (this.props.patient) {
      name = `Patient: ${this.getPatientName(this.props.patient)}`;
    }
    const api = `API: ${this.props.fhirUrl}`;
    return (
      <header>
        <h1>Velferdsteknologi App</h1>
        <p>{api}</p>
        <p>{name}</p>
      </header>
    );
  }
}

Header.propTypes = {
  patient: PropTypes.object,
  fhirUrl: PropTypes.string.isRequired,
};

export default Header;
