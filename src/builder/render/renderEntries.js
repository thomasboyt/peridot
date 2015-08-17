import {writeFileSync} from 'fs';
import {sync as mkdirp} from 'mkdirp';

import renderPage from './renderPage';

export default async function renderEntries(entries) {
  // I can't figure out how to *sequentially* execute a series of promises with async/await,
  // so here's a regular ol' loop for now
  for (let entry of entries) {
    const url = `/entries/${entry.slug}/`;

    const data = {
      entryDetail: entry
    };

    mkdirp(`_site/entries/${entry.slug}`);
    const htmlPath = `_site/entries/${entry.slug}/index.html`;
    const jsonPath = `_site/entries/${entry.slug}/data.json`;

    await renderPage({
      data: data,
      url: url,
      path: htmlPath
    });

    const entryJson = JSON.stringify(entry);
    writeFileSync(jsonPath, entryJson, {encoding: 'utf8'});
  }
}
