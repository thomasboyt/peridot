import React from 'react';

import {connect} from 'react-redux';
import {fetchEntry} from '../actions/entries';

import {Post} from '../projectRequire';

const Entry = React.createClass({
  componentWillMount() {
    const {dispatch, entryDetail} = this.props;
    const {slug} = this.props.params;

    if (entryDetail.slug !== slug) {
      dispatch(fetchEntry(slug));
    }
  },

  render() {
    const {slug} = this.props.params;
    const {entryDetail} = this.props;

    // TODO: use some sort of loading status here instead
    if (entryDetail.slug !== slug) {
      return (
        <p>Loading...</p>
      );
    }

    return (
      <Post {...entryDetail} />
    );
  }
});

function getState(state) {
  return {entryDetail: state.entryDetail};
}

export default connect(getState)(Entry);
