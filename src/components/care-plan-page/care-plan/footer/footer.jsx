import React, { PropTypes } from 'react';
import { formatDateTime } from '../../../../helpers/date-helpers.js';
import './footer.scss';
import Button from '../../../button/button.jsx';
const Footer = ({ comment, author, lastUpdated }) => {
  const date = formatDateTime(lastUpdated);

  const given = author.name.given ? author.name.given.join(' ') : '';
  const family = author.name.family ? author.name.family.join(' ') : '';
  const name = `${given} ${family}`;

  return (
    <div className="careplan-footer">
      <div className="careplan-footer__lastupdated">
        Sist endret {date} av {name}
      </div>
      <p className="careplan-footer__comment">Kommentar: {comment}</p>
      <Button className="careplan-footer__button">Kopier kommentar</Button>
    </div>
  );
};

Footer.propTypes = {
  comment: PropTypes.string.isRequired,
  author: PropTypes.object.isRequired,
  lastUpdated: PropTypes.instanceOf(Date).isRequired,
};

export default Footer;
