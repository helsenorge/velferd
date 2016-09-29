import React, { Component, PropTypes } from 'react';
import TextInput from '../../../../text-input/text-input.jsx';
import Icon from '../../../../icon/icon.jsx';
import iconDelete from '../../../../../../svg/delete.svg';
import './item.scss';

class Input extends Component {
  constructor(props) {
    super(props);
    const { reasonCode, type, i } = this.props;
    this.name = `${reasonCode}-${type}-${i}`;
    this.animateAndDelete = this.animateAndDelete.bind(this);
  }

  componentDidMount() {
    if (this.props.last && this.props.value.length === 0) {
      const el = this.refs.node;
      el.addEventListener('animationend', () => {
        this.refs.node.classList.remove('input-field--adding');
      });
      this.refs.node.classList.add('input-field--adding');
    }
  }

  animateAndDelete() {
    const el = this.refs.node;
    el.addEventListener('animationend', () => {
      this.props.deleteCarePlanItem(this.name);
    });
    el.classList.add('input-field--deleting');
  }

  render() {
    const { edit, value, onChange, saving } = this.props;

    return !edit ? (<li>{value}</li>) : (
      <li>
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
      </li>
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
  last: React.PropTypes.bool.isRequired,
};

export default Input;
