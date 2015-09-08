import {sync as mkdirpSync} from 'mkdirp';

import buildPages from './buildPages';
import buildWebpack from './buildWebpack';
import buildCopy from './buildCopy';

// TODO: not sure this is the best place for this
function ensureBuildFoldersExist() {
  mkdirpSync('_cache/tweets');
  mkdirpSync('_cache/photos');

  mkdirpSync('_site/entries');
}

export default async function build(options) {
  ensureBuildFoldersExist();

  options = options || {};

  const builders = [];

  if (!options.skipPages) {
    builders.push(buildPages);
  }

  if (!options.skipCopy) {
    builders.push(buildCopy);
  }

  if (!options.skipWebpack) {
    builders.push(buildWebpack);
  }

  await* builders.map((builder) => builder(options));
}
