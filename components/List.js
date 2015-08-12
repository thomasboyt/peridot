import React from 'react';
import moment from 'moment';

const DATE_STRING = 'ddd. MMMM Do, YYYY';

const List = React.createClass({
  renderPosts() {
    return this.props.entries.map((post) => {
      return (
        <li key={post.link}>
          <h1><a href={post.link}>{post.title}</a></h1>
          <h3>{moment(post.date, 'YYYY-MM-DD').format(DATE_STRING)}</h3>
        </li>
      );
    });
  },

  render() {
    return (
      <ul>
        {this.renderPosts()}
      </ul>
    );
  }
});

export default List;
