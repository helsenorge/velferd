import React, { Component, PropTypes } from 'react';
import List from './list/list.jsx';
import Goal from '../../goal/goal.jsx';
import './care-plan.scss';
import Icon from '../../icon/icon.jsx';
import Footer from './footer/footer.jsx';
import Controls from './controls/controls.jsx';
import CommentLightbox from './comment-lightbox/comment-lightbox.jsx';
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

  getMeasurements(reasonCode) {
    if (reasonCode === ReasonCodes.green) {
      return this.props.measurements;
    }
    return [];
  }

  render() {
    const { phases, patientGoal, editing, saving, onChange, saveCarePlan,
      deleteCarePlanItem, addCarePlanItem, comment, cancel, updateCarePlanState } = this.props;

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
        measurements={this.getMeasurements(phase.reasonCode)}
        heading="Symptomer"
        editing={editing}
        saving={saving}
        onChange={onChange}
        deleteCarePlanItem={deleteCarePlanItem}
        addCarePlanItem={addCarePlanItem}
        type="symptoms"
        addButtonText="symptom"
        reasonCode={phase.reasonCode}
      />
    );
    const actions = phases.map((phase, i) =>
      <List
        key={i}
        items={phase.actions}
        heading="Hva gjør du?"
        editing={editing}
        saving={saving}
        onChange={onChange}
        deleteCarePlanItem={deleteCarePlanItem}
        addCarePlanItem={addCarePlanItem}
        type="actions"
        addButtonText="tiltak"
        reasonCode={phase.reasonCode}
      />
    );
    const medications = phases.map((phase, i) =>
      <List
        key={i}
        className="care-plan__listheading--medisiner"
        items={phase.medications}
        heading="Medisiner"
        editing={editing}
        saving={saving}
        onChange={onChange}
        deleteCarePlanItem={deleteCarePlanItem}
        addCarePlanItem={addCarePlanItem}
        type="medications"
        addButtonText="medisinering"
        reasonCode={phase.reasonCode}
      />
      );

    const lightbox = this.props.lightboxOpen ?
      <CommentLightbox
        comment={comment}
        onClose={cancel}
        onChange={updateCarePlanState}
        saveCarePlan={saveCarePlan}
      /> : null;

    return (
      <div>
        <Controls
          saving={saving}
          editing={editing}
          {...this.props}
        />
        <Goal patientGoal={patientGoal} editing={editing} onChange={onChange} saving={saving} />
        <div className="care-plan">
          {headings}
          {symptoms}
          {actions}
          {medications}
        </div>
        <Footer />
        {lightbox}
      </div>
    );
  }
}

CarePlan.propTypes = {
  comment: PropTypes.string.isRequired,
  lightboxOpen: PropTypes.bool.isRequired,
  measurements: PropTypes.array.isRequired,
  phases: PropTypes.array.isRequired,
  patientGoal: PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired,
  cancel: PropTypes.func.isRequired,
  updateCarePlanState: PropTypes.func.isRequired,
  saving: React.PropTypes.bool.isRequired,
  deleteCarePlanItem: React.PropTypes.func.isRequired,
  addCarePlanItem: React.PropTypes.func.isRequired,
  saveCarePlan: React.PropTypes.func.isRequired,
};

export default CarePlan;
