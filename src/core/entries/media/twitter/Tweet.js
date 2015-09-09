import Media from '../Media';
import serializeTweet from './serializeTweet';
import {getTweet, addTweet} from './tweetCache';

const TWEET_ID_RE = /https:\/\/twitter.com\/.+\/status\/([0-9]+)/;

function getIdFromUrl(url) {
  return url.match(TWEET_ID_RE)[1];
}

export default class Tweet extends Media {
  constructor(yamlData) {
    super(yamlData);

    this.type = 'tweet';
    this.id = getIdFromUrl(this.meta);
  }

  async hydrate() {
    this.data = getTweet(this.id);
  }

  didFetch(data) {
    this.data = serializeTweet(data);
    addTweet(this.data);
  }
}
