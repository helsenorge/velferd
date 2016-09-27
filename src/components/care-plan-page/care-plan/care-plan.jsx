import React, { Component, PropTypes } from 'react';
import List from './list/list.jsx';
import './care-plan.scss';
import Icon from '../../icon/icon.jsx';
import ReasonCodes from '../../../constants/reason-codes';
import face1 from '../../../../svg/face1.svg';
import face2 from '../../../../svg/face2.svg';
import face3 from '../../../../svg/face3.svg';

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
      return face1;
    case 1:
      return face2;
    case 2:
      return face3;
    default:
      return face1;
    }
  }

  render() {
    const { phases, edit, saving, onChange, deleteCarePlanItem, addCarePlanItem } = this.props;

    const headings = phases.map((phase, i) =>
      <h3 key={i} className="care-plan__heading">
        <Icon glyph={this.getPhaseIcon(i)} className="care-plan__icon" />
        {this.getPhaseName(phase.reasonCode)}
      </h3>
    );
    const symptoms = phases.map((phase, i) =>
      <List
        key={i}
        items={phase.symptoms}
        measurements={phase.measurements}
        heading="Symptomer"
        edit={edit}
        saving={saving}
        onChange={onChange}
        deleteCarePlanItem={deleteCarePlanItem}
        addCarePlanItem={addCarePlanItem}
        type="symptoms"
        reasonCode={phase.reasonCode}
      />
    );
    const actions = phases.map((phase, i) =>
      <List
        key={i}
        items={phase.actions}
        heading="Hva gjør du?"
        edit={edit}
        saving={saving}
        onChange={onChange}
        deleteCarePlanItem={deleteCarePlanItem}
        addCarePlanItem={addCarePlanItem}
        type="actions"
        reasonCode={phase.reasonCode}
      />
    );
    const medications = phases.map((phase, i) =>
      <List
        key={i}
        className="care-plan__listheading--medisiner"
        items={phase.medications}
        heading="Medisiner"
        edit={edit}
        saving={saving}
        onChange={onChange}
        deleteCarePlanItem={deleteCarePlanItem}
        addCarePlanItem={addCarePlanItem}
        type="medications"
        reasonCode={phase.reasonCode}
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
  deleteCarePlanItem: React.PropTypes.func.isRequired,
  addCarePlanItem: React.PropTypes.func.isRequired,
};

export default CarePlan;
