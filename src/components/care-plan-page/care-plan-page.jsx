import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchCarePlan } from '../../actions/care-plan';
import Phase from './phase/phase.jsx';
import { getPhase } from './care-plan.js';
import ReasonCodes from '../../constants/reason-codes';
import './care-plan-page.scss';
import ansikt1 from '../../../svg/ansikt-1.svg';
import ansikt2 from '../../../svg/ansikt-2.svg';
import ansikt3 from '../../../svg/ansikt-3.svg';

class CarePlanPage extends Component {

  componentDidMount() {
    const { dispatch, fhirUrl, patientId, token } = this.props;
    dispatch(fetchCarePlan(fhirUrl, patientId, token));
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

  render() {
    const { phases, isFetching } = this.props;
    const isEmpty = phases.length === 0;
    return (
      <div className="care-plan-page">
        <h2 className="care-plan-page__heading">Egenbehandlingsplan</h2>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
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
                  glyph={icon}
                  key={i}
                  name={this.getPhaseName(phase.reasonCode)}
                  symptoms={phase.symptoms}
                  actions={phase.actions}
                  medications={phase.medications}
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
  dispatch: PropTypes.func.isRequired,
  phases: PropTypes.array.isRequired,
  token: React.PropTypes.string,
};

function mapStateToProps(state) {
  const { carePlan, settings, auth } = state;
  const { fhirUrl, patientId } = settings;
  const {
    isFetching,
    data,
  } = carePlan || {
    isFetching: true,
    data: null,
  };

  const phases = [];

  if (data) {
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
    token: auth.token,
  };
}

export default connect(mapStateToProps)(CarePlanPage);
