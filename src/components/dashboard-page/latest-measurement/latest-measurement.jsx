import React, { PropTypes } from 'react';
import './latest-measurement.scss';
import { formatDate, getTime } from '../../../helpers/date-helpers';
import Icon from '../../icon/icon.jsx';
import iconCalendar from '../../../../svg/calendar.svg';
import iconClock from '../../../../svg/clock.svg';

const LatestMeasurement = ({ data }) => {
  const { date, value, unit } = data;
  let formattedValue = value;

  if (value.length > 1) {
    formattedValue = (<span>{value[0]}/<br />{value[1]}</span>);
  }
  return (
    <div className="latest-measurement">
      <div className="latest-measurement__headingwrapper">
        <h3 className="latest-measurement__heading">Siste måling</h3>
        <div className="latest-measurement__datetime">
          <Icon glyph={iconCalendar} className="latest-measurement__icon" />
          <span>{formatDate(date)}</span>
        </div>
        <div className="latest-measurement__datetime">
          <Icon glyph={iconClock} className="latest-measurement__icon" />
          <span>{getTime(date)}</span>
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
