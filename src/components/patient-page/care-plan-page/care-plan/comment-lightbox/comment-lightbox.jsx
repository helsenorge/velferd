import React, { PropTypes } from 'react';
import Lightbox from '../../../../lightbox/lightbox.jsx';
import './comment-lightbox.scss';
import Button from '../../../../button/button.jsx';

const CommentLightbox = ({ onClose, saveIt }) => {
  let commentInput;

  const onSave = e => {
    e.preventDefault();
    saveIt(commentInput.value);
  };

  return (
    <Lightbox className="commentlightbox" onClose={onClose}>
      <label className="commentlightbox__label" htmlFor="area">
        Legg til en kommentar om hva som er endret
      </label>
      <p className="commentlightbox__paragraph">
        Kommentaren vil ikke komme med på pasientens utskrift
      </p>
      <textarea
        name="comment"
        className="commentlightbox__textarea"
        id="area"
        placeholder="F. eks. Endret medisinering på moderat forverring"
        rows="7"
        ref={(input) => {
          commentInput = input;
        }}
      />
      <Button lvl1 className="commentlightbox__button" onClick={onSave}>
        Legg til og lagre
      </Button>
      <Button lvl2 className="commentlightbox__button" onClick={onClose}>
        Avbryt
      </Button>
    </Lightbox>
  );
};

CommentLightbox.propTypes = {
  onClose: PropTypes.func.isRequired,
  saveIt: PropTypes.func.isRequired,
};

export default CommentLightbox;
