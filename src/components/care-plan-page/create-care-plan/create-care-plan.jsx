import React from 'react';
import Icon from '../../icon/icon.jsx';
import Button from '../../button/button.jsx';
import './create-care-plan.scss';
import iconPlus from '../../../../svg/plus.svg';
import iconHeart from '../../../../svg/person-heart.svg';
import iconLungs from '../../../../svg/person-lungs.svg';
import iconCOPD from '../../../../svg/person-plus.svg';

const CreateCarePlan = ({ createCarePlan }) => (
  <div className="create-care-plan">
    <p className="create-care-plan__noplan">
      Ingen egenbehandlingsplan registrert
    </p>
    <p className="create-care-plan__label">
      Velg mal basert på diagnose
    </p>
    <ul className="create-care-plan__list">
      <li className="create-care-plan__listitem">
        <div className="create-care-plan__iconbox">
          <Icon className="create-care-plan__icon" glyph={iconHeart} />
          <span className="create-care-plan__icontext">Hjertesvikt</span>
        </div>
        <Button
          className="create-care-plan__button"
          square
          onClick={() => createCarePlan('HeartFailure')}
        >
          Opprett egenbehandlingsplan
          <Icon glyph={iconPlus} className="create-care-plan__button-icon" />
        </Button>
      </li>
      <li className="create-care-plan__listitem">
        <div className="create-care-plan__iconbox">
          <Icon className="create-care-plan__icon" glyph={iconLungs} />
          <span className="create-care-plan__icontext">Kols</span>
        </div>
        <Button className="create-care-plan__button" square onClick={() => createCarePlan('COPD')}>
          Opprett egenbehandlingsplan
          <Icon glyph={iconPlus} className="create-care-plan__button-icon" />
        </Button>
      </li>
      <li className="create-care-plan__listitem">
        <div className="create-care-plan__iconbox">
          <Icon className="create-care-plan__icon" glyph={iconCOPD} />
          <span className="create-care-plan__icontext">Kombinert kols og hjertesvikt</span>
        </div>
        <Button className="create-care-plan__button" square>
          Opprett egenbehandlingsplan
          <Icon glyph={iconPlus} className="create-care-plan__button-icon" />
        </Button>
      </li>
    </ul>
  </div>
);

CreateCarePlan.propTypes = {
  createCarePlan: React.PropTypes.func.isRequired,
};

export default CreateCarePlan;
