import React, { PropTypes } from 'react';
const List = ({ heading, values }) => (
  <div>
    <div>
      <h4>{heading}</h4>
    </div>
    <ul>
      {values.map((value, i) =>
        <li key={i}>
        {value}
        </li>
        )}
    </ul>
  </div>
);

List.propTypes = {
  heading: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
};

export default List;
