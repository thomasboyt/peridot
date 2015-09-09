import {readFileSync} from 'fs';
import yaml from 'js-yaml';
import {sync as mkdirpSync} from 'mkdirp';

import loadEntries from './loadEntries';

import renderEntries from './render/renderEntries';
import renderList from './render/renderList';

function ensureBuildFoldersExist() {
  mkdirpSync('_cache/tweets');
  mkdirpSync('_cache/photos');

  mkdirpSync('_site/entries');
}

async function build() {
  ensureBuildFoldersExist();

  const entriesYaml = readFileSync('_entries.yml', {encoding: 'utf8'});

  const entryData = yaml.safeLoad(entriesYaml);

  const entries = await loadEntries(entryData);

  await renderEntries(entries);
  await renderList(entries);
}

async function main() {
  /* eslint no-process-exit: 0 */

  try {
    await build();

  } catch(err) {
    if (err.stack) {
      // JS errors
      console.error(err.stack);

    } else if (err.url) {
      // Failed fetch response
      // e.g. twitter fetch
      console.error(`${err.url} - ${err.status} ${err.statusText}`);
      const body = await err.text();
      console.error(body);

    } else {
      // Other error
      console.error(err);
    }

    process.exit(1);
  }
}

main();
