import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Spinner from '../../../spinner/spinner.jsx';
import Button from '../../../button/button.jsx';
import Icon from '../../../icon/icon.jsx';
import iconPrint from '../../../../../svg/print.svg';
import iconEdit from '../../../../../svg/edit.svg';
import './controls.scss';

const Controls = ({ editing, edit, openLightbox, saving, cancel }) => {
  const cardClasses = classNames({
    controls__card: true,
    'controls__card--flipped': editing,
  });
  return (
    <div className="controls">
      <div className={cardClasses}>
        <div className="controls__front">
          <Button
            className="controls__button controls__button--print"
            lvl3
          >
            <Icon glyph={iconPrint} />
            Skriv ut egenbehandlingsplan
          </Button>
          <Button
            onClick={edit}
            lvl3
            className="controls__button"
          >
            <Icon glyph={iconEdit} />
            Rediger
          </Button>
        </div>
        <div className="controls__back">
          {saving ? (<Spinner />) : null}
          <Button
            onClick={openLightbox}
            className="controls__button controls__button--save"
            disabled={saving}
          >
            Lagre
          </Button>
          <Button
            onClick={cancel}
            lvl2
            className="controls__button"
            disabled={saving}
          >
            Avbryt
          </Button>
        </div>
      </div>
    </div>
    );
};

Controls.propTypes = {
  editing: PropTypes.bool.isRequired,
  edit: PropTypes.func.isRequired,
  openLightbox: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  cancel: PropTypes.func.isRequired,
};

export default Controls;
