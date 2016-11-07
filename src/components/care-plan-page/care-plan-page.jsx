import React, { Component, PropTypes } from 'react';
import shortId from 'shortid';
import { connect } from 'react-redux';
import { saveCarePlan, createCarePlan } from '../../actions/care-plan';
import CarePlan from './care-plan/care-plan.jsx';
import HistoryContainer from './history-container/history-container.jsx';
import CreateCarePlan from './create-care-plan/create-care-plan.jsx';
import ReasonCodes from '../../constants/reason-codes';
import CarePlanCategories from '../../constants/care-plan-categories';
import { getCarePlan } from '../../helpers/care-plan-helpers.js';
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
    this.createCarePlan = this.createCarePlan.bind(this);

    this.state = {
      carePlan: null,
      editing: false,
      saving: false,
    };
  }

  componentWillMount() {
    if (!this.state.carePlan && this.props.carePlan) {
      const carePlan = getCarePlan(this.props.carePlan);
      this.setState({ carePlan });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.carePlan && this.props.carePlan !== nextProps.carePlan &&
      !nextProps.saveCompleted) {
      const carePlan = getCarePlan(nextProps.carePlan);
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
        carePlan.phases[index][ids[1]][ids[2]].text = event.target.value;
      }
    }

    return this.setState({ carePlan });
  }

  deleteCarePlanItem(name) {
    const ids = name.split('-');
    const carePlan = this.state.carePlan;
    const pIndex = this.getPhaseIndex(ids[0]);
    const itemIndex = carePlan.phases[pIndex][ids[1]].findIndex((el) => (
      el.id === ids[3]
    ));

    carePlan.phases[pIndex][ids[1]].splice(itemIndex, 1);
    return this.setState({ carePlan });
  }

  addCarePlanItem(reasonCode, type) {
    const carePlan = this.state.carePlan;
    const index = this.getPhaseIndex(reasonCode);

    carePlan.phases[index][type].push({ id: shortId.generate(), text: '' });
    return this.setState({ carePlan });
  }

  editCarePlan(event) {
    event.preventDefault();
    this.setState({ editing: true });
  }

  cancel() {
    const carePlan = getCarePlan(this.props.carePlan);
    this.setState({ editing: false, carePlan });
  }

  saveCarePlan(event) {
    const { dispatch, fhirUrl, patientId } = this.props;
    event.preventDefault();
    this.setState({ saving: true });
    dispatch(saveCarePlan(fhirUrl, patientId, this.state.carePlan));
  }

  createCarePlan(type) {
    const { dispatch, fhirUrl, patientId } = this.props;
    dispatch(createCarePlan(fhirUrl, patientId, type));
  }

  render() {
    const { isFetching, error } = this.props;
    const { carePlan, editing, saving } = this.state;

    let isEmpty = true;
    let planCategory = '';
    if (carePlan) {
      isEmpty = false;
      planCategory = carePlan.category === CarePlanCategories.HeartFailure ? ' for hjertesvikt'
        : ' for KOLS';
    }
    return (
      <div className="care-plan-page">
        <h2 className="care-plan-page__heading">Egenbehandlingsplan{planCategory}</h2>
        {error && <p>{error}</p>}
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> :
            <CreateCarePlan createCarePlan={this.createCarePlan} />)
          : <CarePlan
            cancel={this.cancel}
            comment={carePlan.comment}
            author={carePlan.author}
            lastUpdated={carePlan.lastUpdated}
            phases={carePlan.phases}
            patientGoal={carePlan.patientGoal}
            editing={editing}
            saving={saving}
            updateCarePlanState={this.updateCarePlanState}
            edit={this.editCarePlan}
            save={this.saveCarePlan}
            cancel={this.cancel}
            measurements={carePlan.measurements}
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
  const { carePlan, settings, patient } = state;
  const { fhirUrl } = settings;
  const { isFetching, data, saveCompleted, error } = carePlan
    || { isFetching: true, data: null, saveCompleted: null };

  let resource;
  const isEmpty = data === null || data.resourceType !== 'Bundle' || data.total === 0;

  if (!saveCompleted && !isEmpty) {
    resource = data.entry[0].resource;
  }

  return {
    fhirUrl,
    patientId: patient.activePatient.id,
    carePlan: resource,
    isFetching,
    saveCompleted,
    error,
  };
}

export default connect(mapStateToProps)(CarePlanPage);
