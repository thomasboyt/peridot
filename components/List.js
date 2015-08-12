import React from 'react';
import moment from 'moment';

const DATE_STRING = 'ddd. MMMM Do, YYYY';

const List = React.createClass({
  renderPosts() {
    return this.props.entries.map((post) => {
      return (
        <li key={post.link}>
          <h2><a href={post.link}>{post.title}</a></h2>
          <h3>{moment(post.date, 'YYYY-MM-DD').format(DATE_STRING)}</h3>
        </li>
      );
    });
  },

  render() {
    return (
      <div>
        <h1>Loud Places</h1>
        <p>I go to lots of concerts. Here are all of them.</p>

        <ul>
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
});

export default List;
