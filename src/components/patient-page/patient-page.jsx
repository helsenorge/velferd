import React, { PropTypes } from 'react';
import PageMenu from '../../components/pagemenu/pagemenu.jsx';

const PatientPage = ({ children }) => (
  <div>
    <PageMenu />
    <article className="main">
      {children}
    </article>
  </div>
);

PatientPage.propTypes = {
  children: PropTypes.object,
};

export default PatientPage;
