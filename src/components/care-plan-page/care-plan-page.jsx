import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchCarePlan, saveCarePlan } from '../../actions/care-plan';
import CarePlan from './care-plan/care-plan.jsx';
import HistoryContainer from './history-container/history-container.jsx';
import CreateCarePlan from './create-care-plan/create-care-plan.jsx';
import ReasonCodes from '../../constants/reason-codes';
import { getCarePlan } from './care-plan-page.js';
import './care-plan-page.scss';

class CarePlanPage extends Component {

  constructor(props) {
    super(props);

    this.updateCarePlanState = this.updateCarePlanState.bind(this);
    this.saveCarePlan = this.saveCarePlan.bind(this);
    this.editCarePlan = this.editCarePlan.bind(this);
    this.deleteCarePlanItem = this.deleteCarePlanItem.bind(this);
    this.addCarePlanItem = this.addCarePlanItem.bind(this);
    this.cancel = this.cancel.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.createCarePlan = this.createCarePlan.bind(this);

    this.state = {
      carePlan: null,
      editing: false,
      saving: false,
      lightboxOpen: false,
    };
  }

  componentDidMount() {
    const { dispatch, fhirUrl, patientId } = this.props;
    dispatch(fetchCarePlan(fhirUrl, patientId));
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.saveCompleted) {
      const carePlan = nextProps.carePlan ? Object.assign({}, nextProps.carePlan) : null;
      this.setState({ carePlan });
    }

    if (nextProps.saveCompleted) {
      this.setState({ saving: false, editing: false });
    }
  }

  getPhaseIndex(reasonCode) {
    switch (reasonCode) {
    case ReasonCodes.green:
      return 0;
    case ReasonCodes.yellow:
      return 1;
    case ReasonCodes.red:
      return 2;
    default:
      return null;
    }
  }

  updateCarePlanState(event) {
    const carePlan = this.state.carePlan;

    if (event.target.name === 'comment') {
      carePlan.comment = event.target.value;
    }
    else if (event.target.name === 'patient-goal') {
      carePlan.patientGoal = event.target.value;
    }
    else {
      const ids = event.target.name.split('-');

      if (ids[1] === 'measurements') {
        const measurement = carePlan.measurements[ids[2]];
        const goal = measurement.goal[[ids[3]]];
        const item = goal[ids[4]];
        item.value = event.target.value;
      }
      else {
        const index = this.getPhaseIndex(ids[0]);
        carePlan.phases[index][ids[1]][ids[2]] = event.target.value;
      }
    }

    return this.setState({ carePlan });
  }

  deleteCarePlanItem(name) {
    const ids = name.split('-');
    const carePlan = this.state.carePlan;
    const index = this.getPhaseIndex(ids[0]);

    carePlan.phases[index][ids[1]].splice(ids[2], 1);
    return this.setState({ carePlan });
  }

  addCarePlanItem(reasonCode, type) {
    const carePlan = this.state.carePlan;
    const index = this.getPhaseIndex(reasonCode);

    carePlan.phases[index][type].push('');
    return this.setState({ carePlan });
  }

  editCarePlan(event) {
    event.preventDefault();
    this.setState({ editing: true });
  }

  cancel() {
    this.setState({ editing: false, lightboxOpen: false });
  }

  saveCarePlan(event) {
    const { dispatch, fhirUrl, patientId } = this.props;
    event.preventDefault();
    this.setState({ saving: true });
    dispatch(saveCarePlan(fhirUrl, patientId, this.state.carePlan));
    this.closeLightbox();
  }

  createCarePlan(type) {
    console.log(type);
  }

  openLightbox() {
    this.setState({ lightboxOpen: true });
  }

  closeLightbox() {
    this.setState({ lightboxOpen: false });
  }

  render() {
    const { isFetching, error } = this.props;
    const { carePlan, editing, saving, lightboxOpen } = this.state;
    let isEmpty = true;
    if (carePlan) {
      isEmpty = true;
    }
    return (
      <div className="care-plan-page">
        <h2 className="care-plan-page__heading">Egenbehandlingsplan</h2>
        {error && <p>{error}</p>}
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> :
            <CreateCarePlan createCarePlan={this.createCarePlan} />)
          : <CarePlan
            lightboxOpen={lightboxOpen}
            cancel={this.cancel}
            comment={carePlan.comment}
            phases={carePlan.phases}
            patientGoal={carePlan.patientGoal}
            editing={editing}
            updateCarePlanState={this.updateCarePlanState}
            edit={this.editCarePlan}
            saveCarePlan={this.saveCarePlan}
            save={this.saveCarePlan}
            openLightbox={this.openLightbox}
            cancel={this.cancel}
            measurements={carePlan.measurements}
            saving={saving}
            onChange={this.updateCarePlanState}
            deleteCarePlanItem={this.deleteCarePlanItem}
            addCarePlanItem={this.addCarePlanItem}
          />
        }
        {carePlan && <HistoryContainer carePlanId={carePlan.id} />}
      </div>
    );
  }
}

CarePlanPage.propTypes = {
  fhirUrl: PropTypes.string.isRequired,
  patientId: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  saveCompleted: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  carePlan: PropTypes.object,
  error: PropTypes.string,
};

function mapStateToProps(state) {
  const { carePlan, settings } = state;
  const { fhirUrl, patientId } = settings;
  const { isFetching, data, saveCompleted, error } = carePlan
    || { isFetching: true, data: null, saveCompleted: null };

  let plan;
  const isEmpty = data === null || data.resourceType !== 'Bundle' || data.total === 0;

  if (!saveCompleted && !isEmpty) {
    plan = getCarePlan(data.entry[0].resource);
    console.log('plan', plan);
  }

  return {
    fhirUrl,
    patientId,
    carePlan: plan,
    isFetching,
    saveCompleted,
    error,
  };
}

export default connect(mapStateToProps)(CarePlanPage);
