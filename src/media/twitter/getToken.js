import {readFileSync} from 'fs';
import yaml from 'js-yaml';
import fetch from 'node-fetch';

const privateYaml = readFileSync('_private.yml', {encoding: 'utf8'});
const privateSettings = yaml.safeLoad(privateYaml);

const apiKey = privateSettings['twitter_api_key'];
const apiSecret = privateSettings['twitter_api_secret'];

export default async function getToken() {
  const encodedKeySecret = encodeURIComponent(apiKey) + ':' + encodeURIComponent(apiSecret);
  const b64KeySecret = new Buffer(encodedKeySecret).toString('base64');

  try {
    const resp = await fetch('https://api.twitter.com/oauth2/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${b64KeySecret}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: 'grant_type=client_credentials'
    });

    if (resp.status !== 200) {
      throw resp;
    }

    const data = await resp.json();

    return data.access_token;

  } catch(err) {
    throw err;
  }
}
