import {readFileSync, writeFileSync} from 'fs';

import Media from '../Media';
import serializeTweet from './serializeTweet';

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
    this.data = this._loadTweetFromCache();
  }

  didFetch(data) {
    this.data = serializeTweet(data);
    this._cacheTweet();
  }

  _loadTweetFromCache() {
    try {
      return JSON.parse(readFileSync(this._getCachePath(), {encoding: 'utf8'}));
    } catch(err) {
      return undefined;
    }
  }

  _cacheTweet() {
    const str = JSON.stringify(this.data);
    writeFileSync(this._getCachePath(), str, {encoding: 'utf8'});
  }

  _getCachePath() {
    return `./_cache/tweets/${this.id}.json`;
  }

}
