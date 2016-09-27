import React, { Component, PropTypes } from 'react';
import TextInput from '../../../../text-input/text-input.jsx';
import Icon from '../../../../icon/icon.jsx';
import iconDelete from '../../../../../../svg/delete.svg';

class Input extends Component {
  constructor(props) {
    super(props);
    const { reasonCode, type, i } = this.props;
    this.name = `${reasonCode}-${type}-${i}`;
    this.listener = this.listener.bind(this);
    this.animateAndDelete = this.animateAndDelete.bind(this);
  }
  listener() {
    const el = this.refs.node;
    const { deleteCarePlanItem } = this.props;
    el.classList.remove('input-field--deleting');
    deleteCarePlanItem(this.name);
    el.removeEventListener('animationend', this.listener);
  }

  animateAndDelete() {
    const el = this.refs.node;
    el.addEventListener('animationend', this.listener);
    el.classList.add('input-field--deleting');
  }

  render() {
    const { edit, value, onChange, saving } = this.props;

    return !edit ? (<span>{value}</span>) : (
      <div className="input-field" ref="node">
        <TextInput
          onChange={onChange}
          name={this.name}
          value={value}
          disabled={saving}
        />
        <button
          className="input-field__delete"
          onClick={this.animateAndDelete}
        >
          <Icon className="input-field__icon" glyph={iconDelete} />
          <span className="input-field__delete-text">Delete</span>
        </button>
      </div>
      );
  }
}

Input.propTypes = {
  reasonCode: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  i: React.PropTypes.number.isRequired,
  deleteCarePlanItem: React.PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool.isRequired,
  value: React.PropTypes.string.isRequired,
};

export default Input;
