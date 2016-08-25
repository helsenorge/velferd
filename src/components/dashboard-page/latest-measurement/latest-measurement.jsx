import React from 'react';
import './latest-measurement.scss';

const LatestMeasurement = () => {
  const date = '29.06.2016';

  return (
    <div className="latest-measurement">
      <h3>Nyeste måling</h3>
      <div className="latest-measurement__date">
        {date}
      </div>
    </div>
    );
};

export default LatestMeasurement;
