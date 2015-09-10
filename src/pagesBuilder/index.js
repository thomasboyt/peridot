import {readFileSync} from 'fs';
import {sync as mkdirpSync} from 'mkdirp';

import renderEntries from './render/renderEntries';
import renderList from './render/renderList';
import errorWrap from '../util/errorWrap';

function ensureBuildFoldersExist() {
  mkdirpSync('_site/entries');
}

async function build(entries) {
  ensureBuildFoldersExist();
  await renderEntries(entries);
  await renderList(entries);
}

export default async function main() {
  const entriesJson = readFileSync('_cache/entries.json', {encoding: 'utf8'});
  const entries = JSON.parse(entriesJson);

  await errorWrap(build, entries);
}
