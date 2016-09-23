import React, { Component, PropTypes } from 'react';
import List from './list/list.jsx';
import './care-plan.scss';
import ReasonCodes from '../../../constants/reason-codes';
import ansikt1 from '../../../../svg/ansikt-1.svg';
import ansikt2 from '../../../../svg/ansikt-2.svg';
import ansikt3 from '../../../../svg/ansikt-3.svg';

class CarePlan extends Component {
  getPhaseName(reasonCode) {
    switch (reasonCode) {
    case ReasonCodes.green:
      return 'Stabil';
    case ReasonCodes.yellow:
      return 'Moderat forverring';
    case ReasonCodes.red:
      return 'Alvorlig forverring';
    default:
      return null;
    }
  }

  getPhaseIcon(i) {
    switch (i) {
    case 0:
      return ansikt1;
    case 1:
      return ansikt2;
    case 2:
      return ansikt3;
    default:
      return ansikt1;
    }
  }

  render() {
    const { phases, edit, saving, onChange } = this.props;

    const headings = phases.map((phase) =>
      <h3 className="care-plan__heading">{this.getPhaseName(phase.reasonCode)}</h3>
    );
    const symptoms = phases.map((phase) =>
      <List
        items={phase.symptoms}
        measurements={phase.measurements}
        heading="Symptomer"
        edit={edit}
        saving={saving}
        onChange={onChange}
      />
    );
    const actions = phases.map((phase) =>
      <List
        items={phase.actions}
        heading="Hva gjør du?"
        edit={edit}
        saving={saving}
        onChange={onChange}
      />
    );
    const medications = phases.map((phase) =>
      <List
        items={phase.medications}
        heading="Medisiner"
        edit={edit}
        saving={saving}
        onChange={onChange}
      />
      );
    return (
      <div className="care-plan">
        {headings}
        {symptoms}
        {actions}
        {medications}
      </div>
    );
  }
}

CarePlan.propTypes = {
  phases: PropTypes.array.isRequired,
  onChange: React.PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  saving: React.PropTypes.bool.isRequired,
};

export default CarePlan;
