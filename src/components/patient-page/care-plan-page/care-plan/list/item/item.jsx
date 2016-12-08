import React, { Component, PropTypes } from 'react';
import TextArea from '../../../../../text-area/text-area.jsx';
import Icon from '../../../../../icon/icon.jsx';
import iconDelete from '../../../../../../../svg/delete.svg';
import './item.scss';

class Input extends Component {
  constructor(props) {
    super(props);
    const { reasonCode, type, i, id } = this.props;
    this.name = `${reasonCode}-${type}-${i}-${id}`;
  }

  componentWillEnter(cb) {
    const el = this.refs.node;
    if (el !== undefined) {
      el.addEventListener('animationend', () => {
        el.classList.remove('input-field--adding');
        cb();
      });
      el.classList.add('input-field--adding');
    }
    else {
      cb();
    }
  }

  componentWillLeave(cb) {
    const el = this.refs.node;
    if (el !== undefined) {
      el.addEventListener('animationend', () => {
        cb();
      });
      el.classList.add('input-field--deleting');
    }
    else {
      cb();
    }
  }

  render() {
    const { editing, value, onChange, saving } = this.props;

    return !editing ? (<li>{value}</li>) : (
      <li className="input-field" ref="node">
        <TextArea
          onChange={onChange}
          name={this.name}
          value={value}
          disabled={saving}
          className="input-field__textarea"
        />
        <button
          className="input-field__delete"
          onClick={() => this.props.deleteCarePlanItem(this.name)}
        >
          <Icon className="input-field__icon" glyph={iconDelete} />
          <span className="input-field__delete-text">Delete</span>
        </button>
      </li>
      );
  }
}

Input.propTypes = {
  reasonCode: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  i: React.PropTypes.number.isRequired,
  deleteCarePlanItem: React.PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool.isRequired,
  value: React.PropTypes.string.isRequired,
  last: React.PropTypes.bool.isRequired,
  id: React.PropTypes.string.isRequired,
};

export default Input;
