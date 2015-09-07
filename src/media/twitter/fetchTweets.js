import fetch from 'node-fetch';

import getToken from './getToken';
import serializeTweet from './serializeTweet';

import {log} from '../util/logger';

export default async function fetchTweets(ids) {
  const token = await getToken();

  // TODO: Split into chunks if urls.length > 100
  const idsParam = ids.join(',');

  try {
    const resp = await fetch(`https://api.twitter.com/1.1/statuses/lookup.json?id=${idsParam}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (resp.status !== 200) {
      throw resp;
    }

    const tweets = await resp.json();

    return tweets.map(serializeTweet);

  } catch(err) {
    log('error fetching tweets');
    throw err;
  }
}
