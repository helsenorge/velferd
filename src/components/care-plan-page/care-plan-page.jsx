import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchCarePlan, saveCarePlan } from '../../actions/care-plan';
import Phase from './phase/phase.jsx';
import { getPhase } from './care-plan.js';
import ReasonCodes from '../../constants/reason-codes';
import './care-plan-page.scss';
import ansikt1 from '../../../svg/ansikt-1.svg';
import ansikt2 from '../../../svg/ansikt-2.svg';
import ansikt3 from '../../../svg/ansikt-3.svg';

class CarePlanPage extends Component {

  constructor(props) {
    super(props);

    this.updatePhaseState = this.updatePhaseState.bind(this);
    this.saveCarePlan = this.saveCarePlan.bind(this);
    this.editCarePlan = this.editCarePlan.bind(this);

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
    return (
      <div className="care-plan-page">
        <h2 className="care-plan-page__heading">Egenbehandlingsplan</h2>
        {error && <p>{error}</p>}
        {!edit && <button onClick={this.editCarePlan}>Rediger</button>}
        {edit && <button onClick={this.saveCarePlan} disabled={saving}>Lagre</button>}
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : null)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            {phases.map((phase, i) => {
              let icon;
              switch (i) {
              case 0:
                icon = ansikt1;
                break;
              case 1:
                icon = ansikt2;
                break;
              case 2:
                icon = ansikt3;
                break;
              default:
                icon = ansikt1;
                break;
              }
              return (
                <Phase
                  edit={edit}
                  saving={saving}
                  glyph={icon}
                  key={i}
                  name={this.getPhaseName(phase.reasonCode)}
                  phase={phase}
                  onChange={this.updatePhaseState}
                />
                );
            }
            )}
          </div>
        }
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
