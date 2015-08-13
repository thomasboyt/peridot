import React from 'react';

import slug from 'slug';
import {writeFileSync} from 'fs';
import {zip} from 'lodash';

import Page from '../../components/Page';
import Post from '../../components/Post';
import List from '../../components/List';


// TODO: load this from a config file
const blogTitle = 'Loud Places';

export function renderPosts(entries) {
  const posts = entries.map((entry) => {
    return (
      <Post {...entry} />
    );
  });

  zip(entries, posts).forEach(([entry, post]) => {
    const data = JSON.stringify({
      post: entry
    });

    const dataEmbed = {
      __html: `window.__data__ = ${data};`
    };

    const renderedPost = {__html: React.renderToString(post)};

    const html = React.renderToStaticMarkup(
      <Page title={`${entry.title} | ${blogTitle}`}>
        <div id="mount-point" dangerouslySetInnerHTML={renderedPost} />

        <script dangerouslySetInnerHTML={dataEmbed} />
        <script src="/js/post.bundle.js" />
      </Page>
    );

    const slugged = slug(`${entry.date} ${entry.title}`, {lower: true});
    entry.link = `/entries/${slugged}.html`;

    const filePath = `_site/entries/${slugged}.html`;
    writeFileSync(filePath, html, {encoding: 'utf8'});
  });
}


export function renderList(entries) {
  // Build list
  const listDataEmbed = {
    __html: `window.__data__ = ${JSON.stringify({entries: entries})};`
  };

  const renderedList = {__html: React.renderToString(
    <List entries={entries} />
  )};

  const listHtml = React.renderToStaticMarkup(
    <Page title={blogTitle}>
      <List entries={entries} />
      <div id="mount-point" dangerouslySetInnerHTML={renderedList} />

      <script dangerouslySetInnerHTML={listDataEmbed} />
      <script src="/js/list.bundle.js" />
    </Page>
  );

  writeFileSync('_site/index.html', listHtml, {encoding: 'utf8'});
}
