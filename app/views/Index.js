import React from 'react';

import {connect} from 'react-redux';
import {fetchEntriesList} from '../actions/entries';

import {List} from '../projectRequire';

const Index = React.createClass({
  componentDidMount() {
    const {dispatch, hydratedList} = this.props;

    if (!hydratedList) {
      dispatch(fetchEntriesList());
    }
  },

  render() {
    const {entries, isLoading, fetchError} = this.props;

    return (
      <List isLoading={isLoading} fetchError={fetchError} entries={entries} />
    );
  }
});

function getState(state) {
  return {
    entries: state.entries,
    isLoading: state.fetchEntriesListPending,
    fetchError: state.fetchEntriesListError,
    hydratedList: state.hydratedList
  };
}

export default connect(getState)(Index);
