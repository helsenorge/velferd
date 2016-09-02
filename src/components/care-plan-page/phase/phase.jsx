import React, { PropTypes } from 'react';
import Icon from '../../icon/icon.jsx';
import './phase.scss';

const Phase = ({ name, symptoms, actions, medications, glyph }) => {
  const getRows = () => {
    const numRows = Math.max(symptoms.length, actions.length, medications.length);
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push((
        <tr className="care-plan-table__row">
          <td className="care-plan-table__cell">
            {symptoms[i] !== undefined ?
              (<span className="care-plan-table__celltext">{symptoms[i]}</span>)
              : null
            }
          </td>
          <td className="care-plan-table__cell">
            {actions[i] !== undefined ?
              (<span className="care-plan-table__celltext">{actions[i]}</span>)
              : null
            }
          </td>
          <td className="care-plan-table__cell">
            {medications[i] !== undefined ?
              (<span className="care-plan-table__celltext">{medications[i]}</span>)
              : null
            }
          </td>
        </tr>
        ));
    }
    return rows;
  };

  let rows = getRows();
  return (
    <table className="care-plan-table">
      <caption className="care-plan-table__caption">
        <Icon className="care-plan-table__icon" glyph={glyph} />
        {name}
      </caption>
      <thead>
        <tr>
          <th scope="col" className="care-plan-table__header">
            Symptomer
          </th>
          <th scope="col" className="care-plan-table__header">
            Hva gjør du
          </th>
          <th scope="col" className="care-plan-table__header">
            Medikamentell Behandling
          </th>
        </tr>
      </thead>
      <tbody className="care-plan-table__body">
        {rows}
      </tbody>
    </table>
  );
};

Phase.propTypes = {
  name: PropTypes.string.isRequired,
  symptoms: PropTypes.array.isRequired,
  actions: PropTypes.array.isRequired,
  medications: PropTypes.array.isRequired,
  glyph: PropTypes.string,
};

export default Phase;
