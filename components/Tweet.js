import React from 'react';
import moment from 'moment';
import Video from './video';

const Tweet = React.createClass({
  stripMediaEntities(original) {
    let text = [];

    const media = this.props.tweet.entities.media;

    if (!media || media.length === 0) {
      return original;
    }

    media.forEach((media) => {
      const before = original.slice(0, media.indices[0]);
      const after = original.slice(media.indices[1]);

      text.push(before, after);
    });

    return text;
  },

  replaceMentions(original) {
    let text = [];

    const mentions = this.props.tweet.entities.user_mentions;

    if (mentions.length === 0) {
      return original;
    }

    mentions.forEach((mention) => {
      const before = original.slice(0, mention.indices[0]);
      const after = original.slice(mention.indices[1]);

      const link = (
        <a href={`https://twitter.com/${mention.screen_name}`}>
          @{mention.screen_name}
        </a>
      );

      text.push(before, link, after);
    });

    return text;
  },

  renderText() {
    let text = this.props.tweet.text;

    // 1. Strip media entities, as these are displayed elsewhere
    text = this.stripMediaEntities(text);
    // 2. Linkify URLs and replace with expanded versions
    // TODO
    // 3. Linkify @handles
    text = this.replaceMentions(text);

    return (
      <span>
        {text}
      </span>
    );
  },

  renderMedia() {
    const entities = this.props.tweet.extended_entities;
    if (!entities || !entities.media) {
      return null;
    }

    const media = entities.media;

    return media.map((media) => {
      if (media.type === 'photo') {
        return (
          <img src={`${media.media_url_https}:small`} key={media.id_str} />
        );
      } else if (media.type === 'video') {
        return <Video media={media} />;
      }
    });
  },

  render() {
    const {tweet} = this.props;

    const timestamp = moment(tweet.created_at, 'ddd MMM DD HH:mm:ss Z YYYY');

    const text = this.renderText();

    return (
      <p>
        <strong>{timestamp.format('hh:mm:ss a')}</strong> - {text}
        <div>
          {this.renderMedia()}
        </div>
      </p>
    );
  }
});

export default Tweet;
