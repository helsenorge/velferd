import React, { PropTypes, Component } from 'react';
import { formatDateTime } from '../../../../../helpers/date-helpers.js';
import './footer.scss';
import Button from '../../../../button/button.jsx';
import Clipboard from 'clipboard';

class Footer extends Component {
  constructor(props) {
    super(props);

    const clipboard = new Clipboard('.careplan-footer__button', { // eslint-disable-line
      text: () => {
        this.refs.copy.classList.remove('careplan-footer__button-text--visible');
        this.refs.copied.classList.add('careplan-footer__button-text--visible');
        setTimeout(() => {
          this.refs.copy.classList.add('careplan-footer__button-text--visible');
          this.refs.copied.classList.remove('careplan-footer__button-text--visible');
        }, 1500);
        return this.props.comment;
      },
    });
  }

  render() {
    const { lastUpdated, author, comment } = this.props;
    const date = formatDateTime(lastUpdated);

    const given = author.name.given ? author.name.given.join(' ') : '';
    const family = author.name.family ? author.name.family.join(' ') : '';
    const name = `${given} ${family}`;
    return (
      <div className="careplan-footer">
        <div className="careplan-footer__screen">
          <div className="careplan-footer__lastupdated">
            Sist endret {date} av {name}
          </div>
          <p className="careplan-footer__comment">Kommentar: {comment}</p>
          <Button className="careplan-footer__button">
            <span
              className="careplan-footer__button-text careplan-footer__button-text--visible"
              ref="copy"
            >
              Kopier kommentar
            </span>
            <span
              className="careplan-footer__button-text"
              ref="copied"
            >
              Kommentar kopiert!
            </span>
          </Button>
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
  }
}

Footer.propTypes = {
  comment: PropTypes.string.isRequired,
  author: PropTypes.object.isRequired,
  lastUpdated: PropTypes.instanceOf(Date).isRequired,
};

export default Footer;
