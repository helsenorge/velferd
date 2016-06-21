import React, { PropTypes, Component } from 'react';

class Header extends Component {

  getPatientName(patient) {
    return `${patient.name[0].family[0]} ${patient.name[0].given[0]}`;
  }

  render() {
    let name = '';
    if (this.props.patient) {
      name = `${this.getPatientName(this.props.patient)}`;
    }
    return (
      <header>
        <h2>Velferdsteknologi App</h2>
        <p>{name}</p>
      </header>
    );
  }
}

Header.propTypes = {
  patient: PropTypes.object,
};

export default Header;
