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

  constructor(props) {
    super(props);
    this.state = { lightboxOpen: false };
    this.cancel = this.cancel.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.save = this.save.bind(this);
  }

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

  getMeasurements(measurements, reasonCode) {
    if (reasonCode === ReasonCodes.green) {
      return measurements;
    }
    return [];
  }

  openLightbox() {
    this.setState({ lightboxOpen: true });
  }

  closeLightbox() {
    this.setState({ lightboxOpen: false });
  }

  save(evt) {
    this.closeLightbox();
    this.props.save(evt);
  }

  cancel() {
    this.closeLightbox();
    this.props.cancel();
  }

  render() {
    const { phases, measurements, ...props } = this.props;

    const headings = phases.map((phase, i) =>
      <h3 key={i} className="care-plan__heading">
        <Icon glyph={this.getPhaseIcon(i)} className="care-plan__icon" />
        <div>{this.getPhaseName(phase.reasonCode)}</div>
      </h3>
    );
    const symptoms = phases.map((phase, i) =>
      <List
        key={i}
        items={phase.symptoms}
        measurements={this.getMeasurements(measurements, phase.reasonCode)}
        heading="Symptomer"
        type="symptoms"
        addButtonText="symptom"
        reasonCode={phase.reasonCode}
        {...props}
      />
    );
    const actions = phases.map((phase, i) =>
      <List
        key={i}
        items={phase.actions}
        heading="Hva gjør du?"
        type="actions"
        addButtonText="tiltak"
        reasonCode={phase.reasonCode}
        {...props}
      />
    );
    const medications = phases.map((phase, i) =>
      <List
        key={i}
        className="care-plan__listheading--medisiner"
        items={phase.medications}
        heading="Medisiner"
        type="medications"
        addButtonText="medisinering"
        reasonCode={phase.reasonCode}
        {...props}
      />
      );

    const lightbox = this.state.lightboxOpen ?
      <CommentLightbox
        onClose={this.closeLightbox}
        saveIt={this.save}
        {...props}
      /> : null;

    return (
      <div>
        <Controls
          openLightbox={this.openLightbox}
          {...props}
        />
        <Goal className="goal--ebh" {...props} />
        <div className="care-plan">
          {headings}
          {symptoms}
          {actions}
          {medications}
        </div>
        <Controls
          footer
          openLightbox={this.openLightbox}
          {...props}
        />
        <Footer {...props} />
        {lightbox}
      </div>
    );
  }
}

CarePlan.propTypes = {
  measurements: PropTypes.array.isRequired,
  phases: PropTypes.array.isRequired,
  cancel: PropTypes.func.isRequired,
  save: React.PropTypes.func.isRequired,
};

export default CarePlan;
