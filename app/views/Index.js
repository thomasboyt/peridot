import React from 'react';

import {connect} from 'react-redux';
import {fetchEntriesList} from '../actions/entries';

import {List} from '../projectRequire';

const Index = React.createClass({
  componentDidMount() {
    const {dispatch} = this.props;

    // TODO: Check if loaded first
    dispatch(fetchEntriesList());
  },

  render() {
    const {entries} = this.props;

    // TODO: Loading state for local

    return (
      <List entries={entries} />
    );
  }
});

function getState(state) {
  return {entries: state.entries};
}

export default connect(getState)(Index);
