import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Spinner from '../../spinner/spinner.jsx';
import Icon from '../../icon/icon.jsx';
import iconPrint from '../../../../svg/print.svg';
import iconEdit from '../../../../svg/edit.svg';

const Controls = ({ edit, editCarePlan, saveCarePlan, saving, cancel }) => {
  const cardClasses = classNames({
    'care-plan-page__card': true,
    'care-plan-page__card--flipped': edit,
  });
  return (
    <div className="care-plan-page__controls">
      <div className={cardClasses}>
        <div className="care-plan-page__front">
          <button
            onClick={editCarePlan}
            className="care-plan-page__button care-plan-page__button--print"
          >
            <Icon glyph={iconPrint} />
            Skriv ut egenbehandlingsplan
          </button>
          <button
            onClick={editCarePlan}
            className="care-plan-page__button care-plan-page__button--edit"
          >
            <Icon glyph={iconEdit} />
            Rediger
          </button>
        </div>
        <div className="care-plan-page__back">
          {saving ? (<Spinner />) : null}
          <button
            onClick={saveCarePlan}
            className="care-plan-page__button care-plan-page__button--save"
            disabled={saving}
          >
            Lagre
          </button>
          <button
            onClick={cancel}
            className="care-plan-page__button care-plan-page__button--cancel"
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
