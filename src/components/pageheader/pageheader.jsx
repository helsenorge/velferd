import React, { PropTypes } from 'react';
import { getCategoryName } from '../../helpers/care-plan-helpers.js';
import { getBirthNumber, getName } from '../../helpers/patient-helpers.js';
import './pageheader.scss';

const PageHeader = ({ patient, user, carePlanCategory, resetPatient }) => {
  const patientName = getName(patient);
  const birthNumber = getBirthNumber(patient);
  const careplanCategory = getCategoryName(carePlanCategory);

  return (
    <header className="pageheader">
      <div className="pageheader__wrapper">
        {patient ? (<div className="pageheader__back"><span
          className="pageheader__back-link" onClick={resetPatient}
        >&#8592; Velg pasient</span></div>) : <div className="pageheader__back"><span
          className="pageheader__back-link"
        >&nbsp;</span></div>}

        {patient ? (<span><span className="pageheader__patient-name">{patientName}</span>
          <span className="pageheader__patient-meta">
          &nbsp;{birthNumber} {careplanCategory && <span>, {careplanCategory}</span>}
          </span></span>) : <span><span className="pageheader__patient-name">&nbsp;</span>
            <span className="pageheader__patient-meta">
            &nbsp;
            </span></span>}
        <span className="pageheader__login-info">
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
  resetPatient: PropTypes.func.isRequired,
};

export default PageHeader;
