import React, { PropTypes } from 'react';
import Lightbox from '../../../lightbox/lightbox.jsx';
import './comment-lightbox.scss';

const CommentLightbox = ({ onClose, saveCarePlan, onChange, comment }) => (
  <Lightbox className="commentlightbox" onClose={onClose}>
    <label className="commentlightbox__label" htmlFor="area">
      Legg til en kommentar om hva som er endret
    </label>
    <p className="commentlightbox__paragraph">
      Kommentaren vil ikke komme med på pasientens utskrift
    </p>
    <textarea
      onChange={onChange}
      value={comment}
      name="comment"
      className="commentlightbox__textarea"
      id="area"
      placeholder="F. eks. Endret medisinering på moderat forverring"
      rows="7"
    />
    <button className="commentlightbox__button commentlightbox__button--add" onClick={saveCarePlan}>
      Legg til og lagre
    </button>
    <button className="commentlightbox__button" onClick={onClose}>
      Avbryt
    </button>
  </Lightbox>
  );

CommentLightbox.propTypes = {
  onClose: PropTypes.func.isRequired,
  saveCarePlan: PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  comment: PropTypes.string.isRequired,
};

export default CommentLightbox;
