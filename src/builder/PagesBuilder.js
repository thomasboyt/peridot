import {readFileSync} from 'fs';
import yaml from 'js-yaml';

import loadEntries from './loadEntries';

import renderEntries from './render/renderEntries';
import renderList from './render/renderList';

import Builder from './Builder';


export default class PagesBuilder extends Builder {
  constructor() {
    super();

    this.description = 'building pages';
  }

  async build(/*options*/) {
    const entriesYaml = readFileSync('_entries.yml', {encoding: 'utf8'});

    const entryData = yaml.safeLoad(entriesYaml);

    const entries = await loadEntries(entryData);

    await renderEntries(entries);
    await renderList(entries);
  }

  async handleError(err) {
    if (err.stack) {
      // JS errors
      this.log(err.stack);

    } else if (err.url) {
      // Failed fetch response
      // e.g. twitter fetch
      this.log(`${err.url} - ${err.status} ${err.statusText}`);
      const body = await err.text();
      this.log(body);

    } else {
      // Other error
      this.log(err);
    }
  }
}
