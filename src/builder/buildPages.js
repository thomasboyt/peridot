import {readFileSync} from 'fs';
import yaml from 'js-yaml';

import loadEntries from './loadEntries';
import {renderPosts, renderList} from './renderer';
import {log} from '../util/logger';


async function buildPagesInternal() {
  const entriesYaml = readFileSync('_entries.yml', {encoding: 'utf8'});

  const entryData = yaml.safeLoad(entriesYaml);

  const entries = await loadEntries(entryData);

  await renderPosts(entries);
  await renderList(entries);
}

export default async function buildPagesWrapper() {
  log('Starting pages build...');

  const startTime = new Date();

  try {
    await buildPagesInternal();

  } catch(err) {
    log('Unhandled error building pages:');

    // warning: lame duck-typing below

    if (err.stack) {
      // JS errors
      log(err.stack);

    } else if (err.url) {
      // Failed fetch response
      // e.g. twitter fetch
      log(`${err.url} - ${err.status} ${err.statusText}`);
      const body = await err.text();
      log(body);

    } else {
      // Other error
      log(err);
    }

    return;
  }

  const endTime = new Date();

  const time = (endTime - startTime) / 1000;

  log(`Finished pages build (${time} s)`);
}
