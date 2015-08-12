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

  renderDescription(description) {
    if (!description) {
      return null;
    }

    const paragraphs = description.split('\n\n');

    const paras = paragraphs.map((paragraph) => (
      <p>{paragraph}</p>
    ));

    return (
      <div className="description">
        {paras}
      </div>
    );
  },

  render() {
    const {title, date, tweets, location} = this.props;

    return (
      <div className="entry">
        <div className="entry-box">
          <h1 className="title">{title}</h1>
          <p>
            {moment(date, 'YYYY-MM-DD').format(DATE_STRING)}
            <span className="at-sign">
              {' @ '}
            </span>
            <strong>{location}</strong>
          </p>
        </div>

        {this.renderDescription(this.props.description)}

        {this.renderTweets(tweets)}
      </div>
    );
  }
});

export default Post;
