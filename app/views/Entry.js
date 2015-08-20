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
    const {dispatch} = this.props;
    const {slug} = this.props.params;

    if (!this.isHydrated()) {
      dispatch(fetchEntry(slug));
    }
  },

  isHydrated() {
    const {slug} = this.props.params;
    return !!(this.props.hydratedEntries[slug]);
  },

  getCurrentEntry() {
    const {entries} = this.props;
    const {slug} = this.props.params;

    return entries.filter((entry) => entry.slug === slug)[0];
  },

  render() {
    const {fetchError} = this.props;

    const entry = this.getCurrentEntry();

    return (
      <Post isHydrated={this.isHydrated()}
        fetchError={fetchError}
        entry={entry} />
    );
  }
});

function getState(state) {
  const entriesState = state.entries;

  return {
    entries: entriesState.entries,
    fetchError: entriesState.fetchEntryError,
    hydratedEntries: entriesState.hydratedEntries
  };
}

export default connect(getState)(Entry);
