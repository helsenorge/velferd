import React, { PropTypes } from 'react';
import './pageheader.scss';

const PageHeader = () => (
  <header className="pageheader">
    <h1 className="pageheader__heading">Avstandsoppfølging</h1>
  </header>
);

PageHeader.propTypes = {
  patient: PropTypes.object,
};

export default PageHeader;
