import {flatten, map} from 'lodash';
import getTweets from './getTweets';

export default async function loadEntries(entryData) {

  // Transform tweet lists from URLs to IDs
  const re = /https:\/\/twitter.com\/.+\/status\/([0-9]+)/;

  entryData.forEach((entry) => {
    entry.tweets = entry.tweets.map((url) => {
      return url.match(re)[1];
    });
  });

  // Concat all tweet IDs into single list to fetch from server
  const tweetIds = flatten(map(entryData, (entry) => entry.tweets));

  const tweets = await getTweets(tweetIds);

  entryData.forEach((entry) => {
    entry.tweets = entry.tweets.map((tweetId) => {
      if (!tweets[tweetId]) {
        throw new Error(`Missing tweet ${tweetId}`);
      }

      return tweets[tweetId];
    });
  });

  return entryData;
}
