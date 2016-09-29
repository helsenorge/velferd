import React, { Component, PropTypes } from 'react';
import Collapse from 'react-collapse';
import classNames from 'classnames';
import iconChevron from '../../../../../svg/chevron.svg';
import Icon from '../../../icon/icon.jsx';
import './history.scss';
class History extends Component {

  constructor(props) {
    super(props);
    this.state = { isOpened: false };
    this.toggleOpened = this.toggleOpened.bind(this);
  }

  getRows(versions) {
    const rows = [];
    versions.forEach((version, i) => {
      const name = `${version.author.name.given.join(' ')} ${version.author.name.family.join(' ')}`;
      const date = new Date(version.date).toLocaleDateString();
      rows.push(
        <tr key={i}>
          <td className="historytable__cell historytable__cell--date">{date}</td>
          <td className="historytable__cell">{name}</td>
          <td className="historytable__cell">{version.comment}</td>
        </tr>);
    });

    return rows;
  }

  toggleOpened() {
    this.setState({ isOpened: !this.state.isOpened });
  }

  render() {
    const { versions } = this.props;
    const { isOpened } = this.state;
    const rows = this.getRows(versions);
    const iconClasses = classNames({
      historytable__expandericon: true,
      'historytable__expandericon--open': isOpened,
    });
    return (
      <div className="historytable">
        <button
          className="historytable__expanderbutton"
          aria-controls="collapse"
          onClick={this.toggleOpened}
        >
          Tidligere versjoner
          <Icon glyph={iconChevron} className={iconClasses} />
        </button>
        <Collapse id="collapse" isOpened={isOpened} aria-expanded={isOpened}>
          <table className="historytable__table">
            <thead>
              <tr>
                <th className="historytable__header">Sist oppdatert</th>
                <th className="historytable__header">Endret av</th>
                <th className="historytable__header">Kommentar</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </Collapse>
      </div>
    );
  }
}

History.propTypes = {
  versions: PropTypes.array.isRequired,
};

export default History;
