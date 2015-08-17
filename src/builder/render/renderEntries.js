import {writeFileSync} from 'fs';
import {sync as mkdirp} from 'mkdirp';

import React from 'react';
import DocumentTitle from 'react-document-title';
import createStore from '../../../app/store';

import renderRoute from './renderRoute';

import requireFromProject from '../../util/requireFromProject';
const Page = requireFromProject('components/Page');


export default async function renderEntries(entries) {
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
