import {readFileSync, writeFileSync} from 'fs';
import fetchTweets from '../media/twitter/fetchTweets';

function getCachePath(id) {
  return `./_cache/${id}.json`;
}

function getCache(id) {
  try {
    return JSON.parse(readFileSync(getCachePath(id), {encoding: 'utf8'}));
  } catch(err) {
    return undefined;
  }
}

function cacheTweet(tweet) {
  const str = JSON.stringify(tweet);
  writeFileSync(getCachePath(tweet.id_str), str, {encoding: 'utf8'});
}

export default async function getTweets(ids) {
  const tweets = {};
  const queue = [];

  ids.forEach((id) => {
    const cached = getCache(id);

    if (cached) {
      tweets[id] = cached;
    } else {
      queue.push(id);
    }
  });

  if (queue.length === 0) {
    // No uncached tweets to fetch
    return tweets;
  }

  const fetchedTweets = await fetchTweets(queue);

  fetchedTweets.forEach((tweet) => {
    cacheTweet(tweet);
    tweets[tweet.id_str] = tweet;
  });

  return tweets;
}
