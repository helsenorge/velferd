import React, { PropTypes } from 'react';
import Summary from './summary/summary.jsx';
const SummaryContainer = function SummaryContainer(props) {
  const measurements = [
      { name: 'Vekt', values: ['94,8 kg, kl 13.50', '95 kg, kl 15.50'] },
      { name: 'Puls', values: ['67 bmp, kl 11.30'] }];
  return (<Summary date={props.date} measurements={measurements} />);
};

SummaryContainer.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
};

export default SummaryContainer;
