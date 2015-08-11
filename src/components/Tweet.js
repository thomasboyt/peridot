import React from 'react';

const Tweet = React.createClass({
  render() {
    console.log(this.props.tweet);
    return <p />;
  }
});

export default Tweet;
