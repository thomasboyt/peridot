import React from 'react';

import {connect} from 'react-redux';
import {fetchEntry} from '../actions/entries';

import {Post} from '../projectRequire';

const Entry = React.createClass({
  propTypes: {
    entries: React.PropTypes.array.isRequired,
    isLoading: React.PropTypes.bool,
    fetchError: React.PropTypes.object
  },

  componentWillMount() {
    const {dispatch, hydratedEntries} = this.props;
    const {slug} = this.props.params;

    if (!hydratedEntries[slug]) {
      dispatch(fetchEntry(slug));
    }
  },

  getCurrentEntry() {
    const {entries} = this.props;
    const {slug} = this.props.params;

    return entries.filter((entry) => entry.slug === slug)[0];
  },

  render() {
    const {isLoading, fetchError} = this.props;

    const entry = this.getCurrentEntry();

    return (
      <Post isLoading={isLoading} fetchError={fetchError} entry={entry} />
    );
  }
});

function getState(state) {
  console.log(state);
  return {
    entries: state.entries,
    isLoading: state.fetchEntryPending,
    fetchError: state.fetchEntryError,
    hydratedEntries: state.hydratedEntries
  };
}

export default connect(getState)(Entry);
