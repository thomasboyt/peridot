import React from 'react';

import {connect} from 'react-redux';
import {fetchEntry} from '../actions/entries';

import {Post} from '../projectRequire';

const Entry = React.createClass({
  componentWillMount() {
    const {dispatch, entryDetail} = this.props;
    const {slug} = this.props.params;

    if (!(entryDetail && entryDetail.slug === slug)) {
      dispatch(fetchEntry(slug));
    }
  },

  render() {
    const {slug} = this.props.params;
    const {entryDetail} = this.props;

    // TODO: use some sort of loading status here instead
    const isLoading = !(entryDetail && entryDetail.slug === slug);

    return (
      <Post isLoading={isLoading} entry={entryDetail} />
    );
  }
});

function getState(state) {
  return {entryDetail: state.entryDetail};
}

export default connect(getState)(Entry);
