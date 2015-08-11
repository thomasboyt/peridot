import fetch from 'node-fetch';

import getToken from './getToken';

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

    return await resp.json();

  } catch(err) {
    console.log('error fetching tweets');
    throw err;
  }
}

