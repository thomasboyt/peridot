import {readFileSync} from 'fs';
import yaml from 'js-yaml';

import loadEntries from './loadEntries';
import {renderPosts, renderList} from './renderer';


async function buildFilesInternal() {
  const entriesYaml = readFileSync('_entries.yml', {encoding: 'utf8'});

  const entryData = yaml.safeLoad(entriesYaml);

  const entries = await loadEntries(entryData);

  renderPosts(entries);
  renderList(entries);
}

export default async function buildFilesWrapper() {
  console.log('Starting files build...');

  try {
    await buildFilesInternal();

  } catch(err) {
    console.error('Unhandled error building files:');

    // warning: lame duck-typing below

    if (err.stack) {
      // JS errors
      console.log(err.stack);

    } else if (err.url) {
      // Failed window.fetch response
      // e.g. twitter fetch
      console.log(`${err.url} - ${err.status} ${err.statusText}`);
      const body = await err.text();
      console.log(body);

    } else {
      // Other error
      console.log(err);
    }

    return;
  }

  console.log('Finished files build');
}
