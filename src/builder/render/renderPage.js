import {writeFileSync} from 'fs';

import React from 'react';
import DocumentTitle from 'react-document-title';

import renderRoute from './renderRoute';

import requireFromProject from '../../util/requireFromProject';
const Page = requireFromProject('components/layouts/Page');

export default async function renderPage({data, url, path}) {
  const innerHTML = await renderRoute(url, data);

  // Rewinds from previous render (slightly magic!)
  const title = DocumentTitle.rewind();

  const json = JSON.stringify(data);

  const listDataEmbed = {
    __html: `window.__data__ = ${json};`
  };

  const html = React.renderToStaticMarkup(
    <Page pageTitle={title}>
      <div id="mount-point" dangerouslySetInnerHTML={{__html: innerHTML}} />

      <script dangerouslySetInnerHTML={listDataEmbed} />
    </Page>
  );

  writeFileSync(path, html, {encoding: 'utf8'});
}
