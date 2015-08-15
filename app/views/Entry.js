import React from 'react';

import {connect} from 'react-redux';
import {fetchEntry} from '../actions/entries';

import {Post} from '../projectRequire';

const Entry = React.createClass({
  componentDidMount() {
    const {dispatch} = this.props;
    const {slug} = this.props.params;

    // TODO: Check if loaded first
    dispatch(fetchEntry(slug));
  },

  render() {
    const {slug} = this.props.params;
    const {entries} = this.props;

    const entry = entries.filter((entry) => entry.slug === slug)[0];

    if (!entry) {
      return (
        <p>Loading...</p>
      );
    }

    return (
      <Post {...entry} />
    );
  }
});

function getState(state) {
  return {entries: state.entries};
}

export default connect(getState)(Entry);

