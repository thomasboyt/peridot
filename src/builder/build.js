import {readFileSync, writeFileSync} from 'fs';
import yaml from 'js-yaml';
import {zip} from 'lodash';

import React from 'react';
import Post from '../../components/Post';
import loadEntries from './loadEntries';

import slug from 'slug';

function getEntryPath(entry) {
  const slugged = slug(`${entry.date} ${entry.title}`, {lower: true});
  return `_site/entries/${slugged}`;
}

export default async function build() {
  const entriesYaml = readFileSync('_entries.yml', {encoding: 'utf8'});

  const entryData = yaml.safeLoad(entriesYaml);

  const entries = await loadEntries(entryData);

  const posts = entries.map((entry) => {
    return (
      <Post {...entry} />
    );
  });

  zip(entries, posts).forEach(([entry, post]) => {
    const html = React.renderToStaticMarkup(post);
    writeFileSync(getEntryPath(entry), html, {encoding: 'utf8'});
  });
}
