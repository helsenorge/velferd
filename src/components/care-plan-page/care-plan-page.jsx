import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchCarePlan, saveCarePlan } from '../../actions/care-plan';
import classNames from 'classnames';
import CarePlan from './care-plan/care-plan.jsx';
import Icon from '../icon/icon.jsx';
import iconPrint from '../../../svg/ikon-print.svg';
import ReasonCodes from '../../constants/reason-codes';
import { getPhase } from './care-plan-page.js';
import './care-plan-page.scss';

class CarePlanPage extends Component {

  constructor(props) {
    super(props);

    this.updatePhaseState = this.updatePhaseState.bind(this);
    this.saveCarePlan = this.saveCarePlan.bind(this);
    this.editCarePlan = this.editCarePlan.bind(this);
    this.deleteCarePlanItem = this.deleteCarePlanItem.bind(this);
    this.addCarePlanItem = this.addCarePlanItem.bind(this);

    this.state = {
      phases: Object.assign([], props.phases),
      edit: false,
      saving: false,
    };
  }

  componentDidMount() {
    const { dispatch, fhirUrl, patientId } = this.props;
    dispatch(fetchCarePlan(fhirUrl, patientId));
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.saveCompleted) {
      this.setState({ phases: Object.assign([], nextProps.phases) });
    }

    if (nextProps.saveCompleted) {
      this.setState({ saving: false, edit: false });
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

  updatePhaseState(event) {
    const ids = event.target.name.split('-');
    const phases = this.state.phases;
    const index = this.getPhaseIndex(ids[0]);

    phases[index][ids[1]][ids[2]] = event.target.value;
    return this.setState({ phases });
  }

  deleteCarePlanItem(name) {
    const ids = name.split('-');
    const phases = this.state.phases;
    const index = this.getPhaseIndex(ids[0]);

    phases[index][ids[1]].splice(ids[2], 1);
    return this.setState({ phases });
  }

  addCarePlanItem(reasonCode, type) {
    const phases = this.state.phases;
    const index = this.getPhaseIndex(reasonCode);

    phases[index][type].push('');
    return this.setState({ phases });
  }

  editCarePlan(event) {
    event.preventDefault();
    this.setState({ edit: true });
  }

  saveCarePlan(event) {
    const { dispatch, fhirUrl, patientId } = this.props;
    event.preventDefault();
    this.setState({ saving: true });
    dispatch(saveCarePlan(fhirUrl, patientId, this.state.phases));
  }

  render() {
    const { isFetching, error } = this.props;
    const { phases, edit, saving } = this.state;
    const isEmpty = phases.length === 0;
    const cardClasses = classNames({
      'care-plan-page__card': true,
      'care-plan-page__card--flipped': edit,
    });
    return (
      <div className="care-plan-page">
        <h2 className="care-plan-page__heading">Egenbehandlingsplan</h2>
        {error && <p>{error}</p>}
        <div className="care-plan-page__controls">
          <div className={cardClasses}>
            <div className="care-plan-page__front">
              <button
                onClick={this.editCarePlan}
                className="care-plan-page__button care-plan-page__button--edit"
              >
                <Icon glyph={iconPrint} />
                Skriv ut egenbehandlingsplan
              </button>
              <button
                onClick={this.editCarePlan}
                className="care-plan-page__button care-plan-page__button--edit"
              >
                Rediger
              </button>
            </div>
            <div className="care-plan-page__back">
              {saving ? (<div className="atom_spinner_circular">
                <div className="spinner">
                  <div className="s1"></div>
                  <div className="s2"></div>
                  <div className="s3"></div>
                  <div className="s4"></div>
                  <div className="s5"></div>
                  <div className="s6"></div>
                  <div className="s7"></div>
                  <div className="s8"></div>
                </div>
              </div>) : null}
              <button
                onClick={this.saveCarePlan}
                className="care-plan-page__button care-plan-page__button--save"
                disabled={saving}
              >
                Lagre
              </button>
              <button
                onClick={this.saveCarePlan}
                className="care-plan-page__button care-plan-page__button--cancel"
                disabled={saving}
              >
                Avbryt
              </button>
            </div>
          </div>
        </div>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : null)
          : <CarePlan
            phases={phases}
            edit={edit}
            saving={saving}
            onChange={this.updatePhaseState}
            deleteCarePlanItem={this.deleteCarePlanItem}
            addCarePlanItem={this.addCarePlanItem}
          />
        }
        <div className="care-plan-page__lastupdated">
          Sist oppdatert: 30.02.2016 kl. 11.34 av Anna For Eieb (lege)
        </div>
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
  phases: PropTypes.array.isRequired,
  error: PropTypes.string,
};

function mapStateToProps(state) {
  const { carePlan, settings } = state;
  const { fhirUrl, patientId } = settings;
  const { isFetching, data, saveCompleted, error } = carePlan
    || { isFetching: true, data: null, saveCompleted: null };

  const phases = [];
  const isEmpty = data === null || data.resourceType !== 'Bundle' || data.total === 0;

  if (!saveCompleted && !isEmpty) {
    const greenPhase = getPhase(data.entry[0].resource, ReasonCodes.green);
    phases.push(greenPhase);
    const yellowPhase = getPhase(data.entry[0].resource, ReasonCodes.yellow);
    phases.push(yellowPhase);
    const redPhase = getPhase(data.entry[0].resource, ReasonCodes.red);
    phases.push(redPhase);
  }

  return {
    fhirUrl,
    patientId,
    phases,
    isFetching,
    saveCompleted,
    error,
  };
}

export default connect(mapStateToProps)(CarePlanPage);
