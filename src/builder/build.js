import {readFileSync, writeFileSync} from 'fs';
import yaml from 'js-yaml';
import {zip} from 'lodash';
import slug from 'slug';
import React from 'react';

import Page from '../../components/Page';
import Post from '../../components/Post';
import List from '../../components/List';

import loadEntries from './loadEntries';

// TODO: load this from a config file
const blogTitle = 'Loud Places';

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
    const html = React.renderToString(
      <Page title={`${entry.title} | ${blogTitle}`}>
        {post}
      </Page>
    );

    const slugged = slug(`${entry.date} ${entry.title}`, {lower: true});
    entry.link = `/entries/${slugged}.html`;

    const filePath = `_site/entries/${slugged}.html`;
    writeFileSync(filePath, html, {encoding: 'utf8'});
  });

  // Build list
  const listHtml = React.renderToStaticMarkup(
    <Page title={blogTitle}>
      <List entries={entries} />
    </Page>
  );

  writeFileSync('_site/index.html', listHtml, {encoding: 'utf8'});
}
