import React, { PropTypes } from 'react';
import './pageheader.scss';

const PageHeader = () => (
  <header className="pageheader">
    <div className="pageheader__wrapper">
      <span>
        Tora Hansen 1230399 12345 hjertesvikt
      </span>
      <span>
        Innlogget som: Anna Fos Eieb (lege), Lillesand legekontor
      </span>
    </div>
  </header>
);

PageHeader.propTypes = {
  patient: PropTypes.object,
};

export default PageHeader;
