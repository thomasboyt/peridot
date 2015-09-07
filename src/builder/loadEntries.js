import {flatten} from 'lodash';
import slug from 'slug';
import Remarkable from 'remarkable';

import getTweets from './getTweets';
import getMedia from '../media/getMedia';

// Transform tweet lists from URLs to IDs
const TWEET_ID_RE = /https:\/\/twitter.com\/.+\/status\/([0-9]+)/;

const md = new Remarkable();

function loadEntry(entry) {
  // TODO: this actually just mutates the passed entry, should probably clone...

  // Add slug
  const slugged = slug(`${entry.date} ${entry.title}`, {lower: true});
  entry.slug = slugged;

  // Add hasContent (used to determine whether to link to page or not)
  entry.hasContent = !!(entry.tweets || entry.description);

  // Set empty tweets if none exist so later code can be lazy about checking existence
  if (!entry.tweets) {
    entry.tweets = [];
  }
  if (!entry.audio) {
    entry.audio = [];
  }

  // Transform tweet URLs to tweet IDs
  // entry.tweets = entry.tweets.map((url) => {
  //   return url.match(TWEET_ID_RE)[1];
  // });

  // Compile Markdown
  // TODO: Add setting for this?
  // TODO: Allow customizing Remarkable settings/use custom renderer
  if (entry.body) {
    entry.body = md.render(entry.body);
  }

  return entry;
}

export default async function loadEntries(entryData) {
  const entries = entryData.map(loadEntry);

  // Concat all tweet into single list
  const tweetUrls = flatten(entries.map((entry) => entry.tweets));

  // Concat all audio into single list
  const audioUrls = flatten(entries.map((entry) => entry.audio));

  const tweets = await getMedia(tweetUrls);
  const audio = await getMedia(audioUrls);

  entries.forEach((entry) => {
    entry.tweets = entry.tweets.map((url) => {
      if (!tweets[url]) {
        throw new Error(`Missing tweet ${url}`);
      }

      return tweets[url];
    });

    entry.audio = entry.audio((url) => {
      if (!audio[url]) {
        throw new Error(`Missing audio ${url}`);
      }

      return audio[url];
    });
  });

  return entries;
}
