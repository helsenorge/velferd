import React, { PropTypes } from 'react';
import { getCategoryName } from '../../helpers/care-plan-helpers.js';
import { getBirthNumber } from '../../helpers/patient-helpers.js';
import './pageheader.scss';

const PageHeader = ({ patient, user, carePlanCategory }) => {
  let patientName = '(No patient)';
  if (patient && patient.name && patient.name.length > 0) {
    const name = patient.name[0];
    const given = name.given ? name.given.join(' ') : '';
    const family = name.family ? name.family.join(' ') : '';
    patientName = `${given} ${family}`;
  }

  const birthNumber = getBirthNumber(patient);

  return (
    <header className="pageheader">
      <div className="pageheader__wrapper">
        <span>
          {patientName} {birthNumber}, {getCategoryName(carePlanCategory)}
        </span>
        <span>
          Innlogget som: {`${user.name.given} ${user.name.family}`}
        </span>
      </div>
    </header>
  );
};

PageHeader.propTypes = {
  patient: PropTypes.object,
  user: PropTypes.object.isRequired,
  carePlanCategory: PropTypes.string,
};

export default PageHeader;
