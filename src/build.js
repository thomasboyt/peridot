import {readFileSync} from 'fs';
import yaml from 'js-yaml';

import React from 'react';
import Post from './components/Post';
import loadEntries from './loadEntries';

export default async function build() {
  const entriesYaml = readFileSync('_entries.yml', {encoding: 'utf8'});

  const entryData = yaml.safeLoad(entriesYaml);

  const entries = await loadEntries(entryData);

  const posts = entries.map((entry) => {
    return (
      <Post {...entry} />
    );
  });

  const html = React.renderToStaticMarkup(posts[0]);

  console.log(html);
}

