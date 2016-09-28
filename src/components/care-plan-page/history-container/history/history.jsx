import React, { Component, PropTypes } from 'react';

class History extends Component {

  getRows(versions) {
    const rows = [];
    versions.forEach((version, i) => {
      const name = `${version.author.name.given.join(' ')} ${version.author.name.family.join(' ')}`;
      const date = new Date(version.date).toLocaleDateString();
      rows.push(
        <tr key={i}>
          <td>{date}</td>
          <td>{name}</td>
          <td>{version.comment}</td>
        </tr>);
    });

    return rows;
  }

  render() {
    const { versions } = this.props;
    const rows = this.getRows(versions);

    return (
      <table className="questionnaire-responses-table">
        <tbody>
        {rows}
        </tbody>
      </table>
    );
  }
}

History.propTypes = {
  versions: PropTypes.array.isRequired,
};

export default History;
