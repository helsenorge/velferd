import React, { Component, PropTypes } from 'react';
import { formatDate2 } from '../../../../helpers/date-helpers.js';

import './history.scss';
class History extends Component {

  getRows(versions) {
    const rows = [];
    versions.forEach((version, i) => {
      const name = `${version.author.name.given.join(' ')} ${version.author.name.family.join(' ')}`;
      const date = formatDate2(version.date);
      rows.push(
        <tr key={i}>
          <td className="historytable__cell historytable__cell--date">{date}</td>
          <td className="historytable__cell">{name}</td>
          <td className="historytable__cell">{version.comment}</td>
        </tr>);
    });

    return rows;
  }

  render() {
    const { versions } = this.props;
    const rows = this.getRows(versions);

    return (
      <div className="historytable">
        <table className="historytable__table">
          <thead>
            <tr>
              <th className="historytable__header">Dato</th>
              <th className="historytable__header">Endret av</th>
              <th className="historytable__header">Kommentar</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

History.propTypes = {
  versions: PropTypes.array.isRequired,
};

export default History;
