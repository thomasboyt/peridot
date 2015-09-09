import _ from 'lodash';
import yaml from 'js-yaml';
import {readFileSync, writeFileSync} from 'fs';
import {sync as mkdirpSync} from 'mkdirp';

import Entry from './Entry';
import fetchMediaQueue from './media/fetchMediaQueue';
import {loadTweetCache, saveTweetCache} from './media/twitter/tweetCache';

function ensureCacheFoldersExist() {
  mkdirpSync('_cache/photos');
}

export default async function buildEntries() {
  ensureCacheFoldersExist();

  loadTweetCache();
  //loadPhotosCache();

  const entriesYaml = readFileSync('_entries.yml', {encoding: 'utf8'});

  const entryData = yaml.safeLoad(entriesYaml);

  // Create Entry models
  const entries = entryData.map((data) => new Entry(data));

  // Hydrate media
  for (let entry of entries) {
    await entry.hydrateMedia();
  }

  // Hydrate queued (batched) media
  const mediaQueue = _.flatten(entries.map((entry) => entry.getMediaQueue()));
  await fetchMediaQueue(mediaQueue);

  saveTweetCache();
  //savePhotosCache();

  const serialized = entries.map((entry) => entry.serialize());

  writeFileSync('_cache/entries.json', JSON.stringify(serialized), {encoding: 'utf8'});
}
