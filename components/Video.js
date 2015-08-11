import React from 'react';

const Video = React.createClass({
  render() {
    const media = this.props.media;

    return (
      <img src={`${media.media_url_https}:small`} key={media.id_str} />
    );
  }
});

export default Video;
