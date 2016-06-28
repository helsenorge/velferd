import React, { Component } from 'react';
import MeasurementContainer from '../containers/measurement-container';
import ObservationCodes from '../constants/observation-codes';

class HistoryPage extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div>
        <MeasurementContainer code={ObservationCodes.weight} showRangeSelector />
      </div>
    );
  }
}

export default HistoryPage;
