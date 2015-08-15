import {readFileSync} from 'fs';
import yaml from 'js-yaml';

import loadEntries from './loadEntries';
import {renderPosts, renderList} from './renderer';
import {log} from '../util/logger';


async function buildFilesInternal() {
  const entriesYaml = readFileSync('_entries.yml', {encoding: 'utf8'});

  const entryData = yaml.safeLoad(entriesYaml);

  const entries = await loadEntries(entryData);

  renderPosts(entries);
  renderList(entries);
}

export default async function buildFilesWrapper() {
  log('Starting files build...');

  try {
    await buildFilesInternal();

  } catch(err) {
    log('Unhandled error building files:');

    // warning: lame duck-typing below

    if (err.stack) {
      // JS errors
      log(err.stack);

    } else if (err.url) {
      // Failed window.fetch response
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

  log('Finished files build');
}
