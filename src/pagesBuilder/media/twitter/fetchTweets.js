import _ from 'lodash';
import fetch from 'node-fetch';

import getToken from './getToken';

/*
 * Given a list of Tweet objects, fetches data for each tweet and calls
 * `tweet.didFetch(fetchedData)` to hydrate the object
 */
export default async function fetchTweets(tweets) {
  const token = await getToken();

  // TODO: Split into chunks if urls.length > 100
  const idsParam = tweets.map((tweet) => tweet.id).join(',');

  const tweetsById = _.indexBy(tweets, 'id');

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

    const fetched = await resp.json();

    for (let tweetData of fetched) {
      tweetsById[tweetData.id_str].didFetch(tweetData);
    }

  } catch(err) {
    console.error('Error fetching tweets');
    throw err;
  }
}
