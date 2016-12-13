import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import PageMenu from './pagemenu/pagemenu.jsx';
import { hashHistory } from 'react-router';

class PatientPage extends Component {

  componentWillMount() {
    if (this.props.patient === null) {
      hashHistory.push('/'); // redirect to root
    }
  }

  render() {
    const { children, patient } = this.props;

    if (patient === null) {
      return null;
    }

    return (
      <div>
        <PageMenu />
        <article className="main">
          {children}
        </article>
      </div>
    );
  }
}

PatientPage.propTypes = {
  children: PropTypes.object,
  patient: PropTypes.object,
};

function mapStateToProps(state) {
  const { patient } = state;
  return { patient: patient.activePatient };
}

export default connect(
  mapStateToProps,
)(PatientPage);
