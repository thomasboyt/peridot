import React from 'react';
import Router from 'react-router';

import {writeFileSync} from 'fs';
import {zip} from 'lodash';
import {sync as mkdirp} from 'mkdirp';

import requireFromProject from '../util/requireFromProject';
const Page = requireFromProject('components/Page');

import routes from '../../app/routes';
import createStore from '../../app/store';
import {Promise} from 'es6-promise';


// TODO: load this from a config file
const blogTitle = 'Loud Places';

async function renderRoute(location, store) {
  return new Promise((resolve/*, reject*/) => {
    Router.run(routes, location, (Root) => {
      const out = React.renderToString(<Root store={store} />);
      resolve(out);
    });
  });
}

export async function renderPosts(entries) {
  const locations = entries.map((entry) => `/entries/${entry.slug}/`);

  const store = createStore({entries: entries});

  const renderedEntries = await* locations.map((loc) => renderRoute(loc, store));

  zip([entries, renderedEntries], (entry, renderedEntry) => {
    const data = JSON.stringify(entry);

    const dataEmbed = {
      __html: `window.__data__ = ${data};`
    };

    const html = React.renderToStaticMarkup(
      <Page title={`${entry.title} | ${blogTitle}`}>
        <div id="mount-point" dangerouslySetInnerHTML={{__html: renderedEntry}} />

        <script dangerouslySetInnerHTML={dataEmbed} />
      </Page>
    );

    // Write entry HTML
    mkdirp(`_site/entries/${entry.slug}`);
    const htmlPath = `_site/entries/${entry.slug}/index.html`;
    writeFileSync(htmlPath, html, {encoding: 'utf8'});

    // Write entry JSON
    const jsonPath = `_site/entries/${entry.slug}.json`;
    const jsonData = JSON.stringify(entry);
    writeFileSync(jsonPath, jsonData, {encoding: 'utf8'});
  });
}


export async function renderList(entries) {
  const shortEntries = entries.map((entry) => {
    return {
      title: entry.title,
      location: entry.location,
      date: entry.date,
      slug: entry.slug
    };
  });

  const entryJson = JSON.stringify(shortEntries);

  const store = createStore({entries: entries});

  const renderedList = await renderRoute('/', store);

  const listDataEmbed = {
    __html: `window.__data__ = ${entryJson};`
  };

  const listHtml = React.renderToStaticMarkup(
    <Page title={blogTitle}>
      <div id="mount-point" dangerouslySetInnerHTML={{__html: renderedList}} />

      <script dangerouslySetInnerHTML={listDataEmbed} />
    </Page>
  );

  writeFileSync('_site/index.html', listHtml, {encoding: 'utf8'});

  writeFileSync('_site/entries.json', entryJson, {encoding: 'utf8'});
}
