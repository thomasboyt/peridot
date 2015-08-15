import {readFileSync} from 'fs';
import yaml from 'js-yaml';

import loadEntries from './loadEntries';
import {renderPosts, renderList} from './renderer';


export default async function buildFiles() {
  const entriesYaml = readFileSync('_entries.yml', {encoding: 'utf8'});

  const entryData = yaml.safeLoad(entriesYaml);

  const entries = await loadEntries(entryData);

  renderPosts(entries);
  renderList(entries);
}
