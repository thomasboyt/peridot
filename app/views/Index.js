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
      <List isLoading={!!isLoading} fetchError={fetchError} posts={entries} />
    );
  }
});

function getState(state) {
  const entriesState = state.entries;

  return {
    entries: entriesState.entries,
    isLoading: entriesState.fetchEntriesListPending,
    fetchError: entriesState.fetchEntryError,
    hydratedList: entriesState.hydratedList
  };
}

export default connect(getState)(Index);
