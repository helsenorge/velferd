import React, { PropTypes } from 'react';
import './pageheader.scss';

const PageHeader = ({ patient }) => {
  let patientName;
  if (patient.name && patient.name.length > 0) {
    const name = patient.name[0];
    const given = name.given ? name.given.join(' ') : '';
    const family = name.family ? name.family.join(' ') : '';
    patientName = `${given} ${family}`;
  }

  return (
    <header className="pageheader">
      <div className="pageheader__wrapper">
        <span>
          {patientName} 1230399 12345 hjertesvikt
        </span>
        <span>
          Innlogget som: Anna Fos Eieb (lege), Lillesand legekontor
        </span>
      </div>
    </header>
  );
};

PageHeader.propTypes = {
  patient: PropTypes.object,
};

export default PageHeader;
