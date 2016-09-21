import React, { PropTypes } from 'react';
import './latest-measurement.scss';
import { formatDate } from '../../../helpers/date-helpers';

const LatestMeasurement = ({ data }) => {
  const { date, value, unit } = data;
  let formattedValue = value;

  if (value.length > 1) {
    formattedValue = (<span>{value[0]}/<br />{value[1]}</span>);
  }
  return (
    <div className="latest-measurement">
      <div className="latest-measurement__headingwrapper">
        <h3 className="latest-measurement__heading">Nyeste måling</h3>
        <div className="latest-measurement__date">
          {formatDate(date)}
        </div>
      </div>
      <div className="latest-measurement__valuewrapper">
        <span className="latest-measurement__value">{formattedValue}</span>
        <span className="latest-measurement__unit">{unit}</span>
      </div>
    </div>
    );
};

LatestMeasurement.propTypes = {
  data: PropTypes.object.isRequired,
};

export default LatestMeasurement;
