import React, { Component, PropTypes } from 'react';
import Phase from './phase/phase.jsx';
import ReasonCodes from '../../../constants/reason-codes';
import ansikt1 from '../../../../svg/ansikt-1.svg';
import ansikt2 from '../../../../svg/ansikt-2.svg';
import ansikt3 from '../../../../svg/ansikt-3.svg';

class CarePlan extends Component {
  getPhaseName(reasonCode) {
    switch (reasonCode) {
    case ReasonCodes.green:
      return 'Stabil fase av hjertesvikt';
    case ReasonCodes.yellow:
      return 'Moderat forverring av hjertesvikt';
    case ReasonCodes.red:
      return 'Alvorlig forverring av hjertesvikt';
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
    const { phases, edit, saving, onChange, deleteCarePlanItem, addCarePlanItem } = this.props;

    return (
      <div>
        {phases.map((phase, i) => {
          let icon = this.getPhaseIcon(i);
          return (
            <Phase
              edit={edit}
              saving={saving}
              glyph={icon}
              key={i}
              name={this.getPhaseName(phase.reasonCode)}
              phase={phase}
              onChange={onChange}
              deleteCarePlanItem={deleteCarePlanItem}
              addCarePlanItem={addCarePlanItem}
            />
            );
        }
        )}
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
