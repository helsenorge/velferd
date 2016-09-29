import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchCarePlanHistory } from '../../../actions/care-plan';
import { getVersions } from './history-container.js';
import History from './history/history.jsx';

class HistoryContainer extends Component {

  componentDidMount() {
    const { dispatch, fhirUrl, carePlanId } = this.props;
    dispatch(fetchCarePlanHistory(fhirUrl, carePlanId));
  }

  render() {
    const { versions, isFetching } = this.props;
    const isEmpty = versions.length === 0;
    return (
      <div>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : null)
          : <History versions={versions} />
        }
      </div>
    );
  }
}

HistoryContainer.propTypes = {
  fhirUrl: PropTypes.string.isRequired,
  carePlanId: PropTypes.string.isRequired,
  versions: PropTypes.array,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { carePlan, settings } = state;
  let isFetching = true;
  let versions = [];

  if (carePlan && carePlan.history) {
    isFetching = carePlan.history.isFetching;

    if (carePlan.history.data) {
      versions = getVersions(carePlan.history.data);
    }
  }

  const { fhirUrl } = settings;

  return {
    fhirUrl,
    versions,
    isFetching,
  };
}

export default connect(mapStateToProps)(HistoryContainer);
