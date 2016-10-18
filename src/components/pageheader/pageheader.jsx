import React, { PropTypes } from 'react';
import './pageheader.scss';

const PageHeader = ({ patient, user }) => {
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
          {patientName}, Hjertesvikt
        </span>
        <span>
          Innlogget som: {`${user.name.given} ${user.name.family}`}
        </span>
      </div>
    </header>
  );
};

PageHeader.propTypes = {
  patient: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default PageHeader;
