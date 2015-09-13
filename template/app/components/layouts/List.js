import React from 'react';
import DocumentTitle from 'react-document-title';
import {Link} from 'react-router';

import Loading from '../Loading';

/*
 * The list view[...]
 */
const List = React.createClass({

  propTypes: {
    // A list of loaded post data.
    posts: React.PropTypes.array.isRequired,

    // Whether the post data has loaded yet.
    isLoading: React.PropTypes.bool.isRequired,

    // An error encountered during loading.
    fetchError: React.PropTypes.object,
  },

  renderPosts() {
    const posts = this.props.posts.map((post) => {
      return (
        <li key={post.slug}>
          <Link to={`entries/${post.slug}`}>{post.title}</Link>
        </li>
      );
    });

    return (
      <ul>
        {posts}
      </ul>
    );
  },

  render() {
    const {isLoading} = this.props;

    return (
      <DocumentTitle title="Home">
        <div className="home">
          {!isLoading ? this.renderPosts() : <Loading />}
        </div>
      </DocumentTitle>
    );
  }
});

export default List;
