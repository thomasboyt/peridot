import {readFileSync} from 'fs';
import yaml from 'js-yaml';
import React from 'react';

import Post from './components/Post';

const entriesYaml = readFileSync('_entries.yml', {encoding: 'utf8'});

const entries = yaml.safeLoad(entriesYaml);

const posts = entries.map((entry) => {
  return (
    <Post {...entry} />
  );
});

const html = React.renderToStaticMarkup(posts[0]);

console.log(html);
