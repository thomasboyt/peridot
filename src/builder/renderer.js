import React from 'react';
import Router from 'react-router';

import {writeFileSync} from 'fs';
import {zip} from 'lodash';
import {sync as mkdirp} from 'mkdirp';
import {Promise} from 'es6-promise';

import requireFromProject from '../util/requireFromProject';
const Page = requireFromProject('components/Page');

import routes from '../../app/routes';
import createStore from '../../app/store';
import {Provider} from 'react-redux';
import DocumentTitle from 'react-document-title';


function renderRoute(location, store) {
  return new Promise((resolve/*, reject*/) => {
    Router.run(routes, location, (Root, routerState) => {

      const out = React.renderToString(
        <Provider store={store}>
          {() => <Root routerState={routerState} />}
        </Provider>
      );

      resolve(out);
    });
  });
}

export async function renderPosts(entries) {
  const renderedEntries = await* entries.map((entry) => {
    const url = `/entries/${entry.slug}/`;

    const store = createStore({
      entryDetail: entry
    });

    const renderedEntry = renderRoute(url, store);
    const title = DocumentTitle.rewind();

    return {entry, renderedEntry, title};
  });

  renderedEntries.map(({entry, renderedEntry, title}) => {
    const jsonEntry = JSON.stringify(entry);

    const dataEmbed = {
      __html: `window.__data__ = {entryDetail: ${jsonEntry}};`
    };

    const html = React.renderToStaticMarkup(
      <Page pageTitle={title}>
        <div id="mount-point" dangerouslySetInnerHTML={{__html: renderedEntry}} />

        <script dangerouslySetInnerHTML={dataEmbed} />
      </Page>
    );

    // Write entry HTML
    mkdirp(`_site/entries/${entry.slug}`);
    const htmlPath = `_site/entries/${entry.slug}/index.html`;
    writeFileSync(htmlPath, html, {encoding: 'utf8'});

    // Write entry JSON
    const jsonPath = `_site/entries/${entry.slug}/data.json`;
    writeFileSync(jsonPath, jsonEntry, {encoding: 'utf8'});
  });
}


export async function renderList(entries) {
  const shortEntries = entries.map((entry) => {
    return {
      title: entry.title,
      location: entry.location,
      date: entry.date,
      slug: entry.slug,
      hasContent: entry.hasContent
    };
  });

  const entryJson = JSON.stringify(shortEntries);

  const store = createStore({entries: entries});

  const renderedList = await renderRoute('/', store);
  const title = DocumentTitle.rewind();

  const listDataEmbed = {
    __html: `window.__data__ = {entries: ${entryJson}};`
  };

  const listHtml = React.renderToStaticMarkup(
    <Page pageTitle={title}>
      <div id="mount-point" dangerouslySetInnerHTML={{__html: renderedList}} />

      <script dangerouslySetInnerHTML={listDataEmbed} />
    </Page>
  );

  writeFileSync('_site/index.html', listHtml, {encoding: 'utf8'});

  writeFileSync('_site/entries.json', entryJson, {encoding: 'utf8'});
}
