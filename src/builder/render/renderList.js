import {writeFileSync} from 'fs';

import React from 'react';
import DocumentTitle from 'react-document-title';

import createStore from '../../../app/store';

import renderRoute from './renderRoute';

import requireFromProject from '../../util/requireFromProject';
const Page = requireFromProject('components/Page');


export default async function renderList(entries) {
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
