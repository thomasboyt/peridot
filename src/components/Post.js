import React from 'react';
import moment from 'moment';

import Tweet from './Tweet';


const DATE_STRING = 'ddd. MMMM Do, YYYY';

const Post = React.createClass({
  renderTweets(tweets) {
    return tweets.map((tweet) => {
      return (
        <Tweet tweet={tweet} key={tweet.id_str} />
      );
    });
  },

  render() {
    const {title, date, tweets} = this.props;

    return (
      <div>
        <h1>{title}</h1>
        <h3>{moment(date, 'MM/DD/YY').format(DATE_STRING)}</h3>

        {this.renderTweets(tweets)}
      </div>
    );
  }
});

export default Post;
