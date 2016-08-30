import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchCarePlan } from '../../actions/care-plan';
import Phase from './phase/phase.jsx';
import { getPhase } from './care-plan.js';

class CarePlanPage extends Component {

  componentDidMount() {
    const { dispatch, fhirUrl, patientId } = this.props;
    dispatch(fetchCarePlan(fhirUrl, patientId));
  }

  getPhaseName(reasonCode) {
    switch (reasonCode) {
    case 'green':
      return 'Stabil fase av hjertesvikt';
    case 'yellow':
      return 'Moderat forverring av hertesvikt';
    case 'red':
      return 'Alvorlig forverring av hjertesvikt';
    default:
      return null;
    }
  }

  render() {
    return (
      <div>
        {this.props.phases.map((phase) =>
          <Phase
            name={this.getPhaseName(phase.reasonCode)}
            symptoms={phase.symptoms}
            actions={phase.actions}
            medications={phase.medications}
          />
        )}
      </div>
    );
  }
}

CarePlanPage.propTypes = {
  fhirUrl: PropTypes.string.isRequired,
  patientId: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  phases: PropTypes.array.isFetching,
};

function mapStateToProps(state) {
  const { carePlan, settings } = state;
  const { fhirUrl, patientId } = settings;

  const phases = [];

  if (carePlan.data) {
    const greenPhase = getPhase(carePlan.data.entry[0].resource, 'green');
    phases.push(greenPhase);
    const yellowPhase = getPhase(carePlan.data.entry[0].resource, 'yellow');
    phases.push(yellowPhase);
    const redPhase = getPhase(carePlan.data.entry[0].resource, 'red');
    phases.push(redPhase);
  }

  return {
    fhirUrl,
    patientId,
    carePlan,
    phases,
  };
}

export default connect(mapStateToProps)(CarePlanPage);
