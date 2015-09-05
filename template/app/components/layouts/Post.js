import React from 'react';
import DocumentTitle from 'react-document-title';

import Loading from '../Loading';

/*
 * The post view[...]
 *
 * Explain how title/date/metadata are always loaded, description is loaded later (hydrated)
 */
const Post = React.createClass({

  propTypes: {
    // The post object.[...]
    post: React.PropTypes.object.isRequired,

    // Whether the post contents have been loaded.
    // TODO: rename this isLoaded...
    isHydrated: React.PropTypes.bool.isRequired,

    // An error encountered fetching the post.
    fetchError: React.PropTypes.object,
  },

  renderHydrated() {
    return (
      <div>
        {this.props.post.body}
      </div>
    );
  },

  render() {
    const {isHydrated} = this.props;
    const {title} = this.props.post;

    return (
      <DocumentTitle title={title}>
        <div>
          <h2>
            {title}
          </h2>

          {isHydrated ? this.renderHydrated() : <Loading />}
        </div>
      </DocumentTitle>
    );
  }
});

export default Post;
