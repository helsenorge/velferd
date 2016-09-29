import React from 'react';

const CreateCarePlan = ({ createCarePlan }) => (
  <div>
    <div>
      Ingen egenbehandlingsplan registrert
    </div>
    <div>
      Opprett en egenbehandlingsplan basert på maler som er utviklet for pasientents diagnose
    </div>
    <br />
    <button onClick={() => createCarePlan('HeartFailure')} >Opprett Hjertesvikt</button>
    &nbsp;|&nbsp;
    <button onClick={() => createCarePlan('COPD')} >Opprett KOLS</button>
  </div>
);

CreateCarePlan.propTypes = {
  createCarePlan: React.PropTypes.func.isRequired,
};

export default CreateCarePlan;
