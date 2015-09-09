import {readFileSync, writeFileSync} from 'fs';

const cachePath = `_cache/tweets.json`;

let cache = null;

export function loadTweetCache() {
  let tweetCacheJson;

  try {
    tweetCacheJson = readFileSync(cachePath, {encoding: 'utf8'});
  } catch(err) {
    cache = {};
    return;
  }

  cache = JSON.parse(tweetCacheJson);
}

export function getTweet(id) {
  if (cache === null) {
    throw new Error('Call `loadTweetCache()` before attempting to get a tweet');
  }

  return cache[id];
}

export function addTweet(tweet) {
  cache[tweet.id_str] = tweet;
}

export function saveTweetCache() {
  const str = JSON.stringify(cache);
  writeFileSync(cachePath, str, {encoding: 'utf8'});
}
