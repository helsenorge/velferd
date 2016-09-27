import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Spinner from '../../spinner/spinner.jsx';
import Icon from '../../icon/icon.jsx';
import iconPrint from '../../../../svg/print.svg';
import iconEdit from '../../../../svg/edit.svg';
import './controls.scss';

const Controls = ({ edit, editCarePlan, saveCarePlan, saving, cancel }) => {
  const cardClasses = classNames({
    controls__card: true,
    'controls__card--flipped': edit,
  });
  return (
    <div className="controls">
      <div className={cardClasses}>
        <div className="controls__front">
          <button
            onClick={editCarePlan}
            className="controls__button controls__button--print"
          >
            <Icon glyph={iconPrint} />
            Skriv ut egenbehandlingsplan
          </button>
          <button
            onClick={editCarePlan}
            className="controls__button controls__button--edit"
          >
            <Icon glyph={iconEdit} />
            Rediger
          </button>
        </div>
        <div className="controls__back">
          {saving ? (<Spinner />) : null}
          <button
            onClick={saveCarePlan}
            className="controls__button controls__button--save"
            disabled={saving}
          >
            Lagre
          </button>
          <button
            onClick={cancel}
            className="controls__button controls__button--cancel"
            disabled={saving}
          >
            Avbryt
          </button>
        </div>
      </div>
    </div>
    );
};

Controls.propTypes = {
  edit: PropTypes.bool.isRequired,
  editCarePlan: PropTypes.func.isRequired,
  saveCarePlan: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  cancel: PropTypes.func.isRequired,
};

export default Controls;
