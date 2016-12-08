import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Collapse from 'react-collapse';
import { fetchCarePlanHistory } from '../../../../actions/care-plan';
import { getVersions } from './history-container.js';
import History from './history/history.jsx';
import iconChevron from '../../../../../svg/chevron.svg';
import Icon from '../../../icon/icon.jsx';
import Button from '../../../button/button.jsx';
import './history-container.scss';

class HistoryContainer extends Component {

  constructor(props) {
    super(props);
    this.state = { isOpened: false };
    this.toggleOpened = this.toggleOpened.bind(this);
  }

  toggleOpened() {
    const isOpened = !this.state.isOpened;
    if (isOpened) {
      const { dispatch, carePlanId } = this.props;
      dispatch(fetchCarePlanHistory(carePlanId));
    }
    this.setState({ isOpened });
  }

  render() {
    const { versions, isFetching } = this.props;
    const { isOpened } = this.state;
    const isEmpty = versions.length === 0;
    const iconClasses = classNames({
      'history-container__expandericon': true,
      'history-container__expandericon--open': isOpened,
    });
    return (
      <div className="history-container">
        <Button
          className="history-container__expanderbutton"
          aria-controls="collapse"
          onClick={this.toggleOpened}
          lvl3
        >
          <span className="button__text">Tidligere versjoner</span>
          <Icon glyph={iconChevron} className={iconClasses} />
        </Button>
        <Collapse id="collapse" isOpened={isOpened} aria-expanded={isOpened}>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : null)
          : <History versions={versions} />
        }
        </Collapse>
      </div>
    );
  }
}

HistoryContainer.propTypes = {
  carePlanId: PropTypes.string.isRequired,
  versions: PropTypes.array,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { carePlan } = state;
  let isFetching = true;
  let versions = [];

  if (carePlan && carePlan.history) {
    isFetching = carePlan.history.isFetching;

    if (carePlan.history.data) {
      versions = getVersions(carePlan.history.data);
    }
  }

  return {
    versions,
    isFetching,
  };
}

export default connect(mapStateToProps)(HistoryContainer);
