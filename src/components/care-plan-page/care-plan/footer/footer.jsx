import React, { PropTypes } from 'react';
import { formatDateTime } from '../../../../helpers/date-helpers.js';
import './footer.scss';
import Button from '../../../button/button.jsx';
const Footer = ({ comment, author, lastUpdated }) => {
  const date = formatDateTime(lastUpdated);
  const name = `${author.name.given.join(' ')} ${author.name.family.join(' ')}`;

  return (
    <div className="footer">
      <div className="footer__lastupdated">
        Sist endret {date} av {name}
      </div>
      <p className="footer__comment">Kommentar: {comment}</p>
      <Button className="footer__button">Kopier kommentar</Button>
    </div>
  );
};

Footer.propTypes = {
  comment: PropTypes.string.isRequired,
  author: PropTypes.object.isRequired,
  lastUpdated: PropTypes.instanceOf(Date).isRequired,
};

export default Footer;
