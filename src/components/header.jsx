import React, { PropTypes, Component } from 'react';
import { Link, IndexLink } from 'react-router';
import './header.scss';

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
        <span>{name}</span>
        <nav>
          <IndexLink to="/" activeClassName="active">Målinger</IndexLink>
            {" | "}
          <Link to="/history" activeClassName="active">Historikk</Link>
            {" | "}
          <Link to="/careplan" activeClassName="active">Egenbehandlingsplan</Link>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  patient: PropTypes.object,
};

export default Header;
