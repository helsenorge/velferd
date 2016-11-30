import React, { PropTypes } from 'react';
import { formatDateTime } from '../../../../helpers/date-helpers.js';
import './footer.scss';
import Button from '../../../button/button.jsx';
import Clipboard from 'clipboard';

const Footer = ({ comment, author, lastUpdated }) => {
  const date = formatDateTime(lastUpdated);

  const given = author.name.given ? author.name.given.join(' ') : '';
  const family = author.name.family ? author.name.family.join(' ') : '';
  const name = `${given} ${family}`;

  const clipboard = new Clipboard('.careplan-footer__button', { // eslint-disable-line
    text: (trigger) => {
      const button = trigger;
      button.innerText = 'Kommentar kopiert!';
      setTimeout(() => {
        button.innerText = 'Kopier kommentar';
      }, 1000);
      return comment;
    },
  });

  return (
    <div className="careplan-footer">
      <div className="careplan-footer__screen">
        <div className="careplan-footer__lastupdated">
          Sist endret {date} av {name}
        </div>
        <p className="careplan-footer__comment">Kommentar: {comment}</p>
        <Button className="careplan-footer__button">Kopier kommentar</Button>
      </div>
      <div className="careplan-footer__print">
        <b>Ved tvil eller manglende effekt av behandlingen, kontakt lege!</b>
        <div className="careplan-footer__underskrift">
          <span className="careplan-footer__date">Dato:</span>
          <span className="careplan-footer__legens-underskrift">Legens underskrift:</span>
        </div>
      </div>
    </div>
  );
};

Footer.propTypes = {
  comment: PropTypes.string.isRequired,
  author: PropTypes.object.isRequired,
  lastUpdated: PropTypes.instanceOf(Date).isRequired,
};

export default Footer;
