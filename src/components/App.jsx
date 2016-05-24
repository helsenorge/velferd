import React from 'react';
import MeasurementsContainer from '../containers/measurements-container';
import ObservationCodes from '../constants/observation-codes';

const App = function App() {
  return (
    <div>
      <h1>Velferdsteknologi App</h1>
      <MeasurementsContainer code={ObservationCodes.weight} />
      <MeasurementsContainer code={ObservationCodes.pulse} />
      <MeasurementsContainer code={ObservationCodes.pulseOximeter} />
    </div>
    );
};

export default App;
