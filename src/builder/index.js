import {sync as mkdirpSync} from 'mkdirp';

import buildPages from './buildPages';
import buildWebpack from './buildWebpack';

// TODO: not sure this is the best place for this
function ensureBuildFoldersExist() {
  mkdirpSync('_cache/tweets');

  mkdirpSync('_site/entries');
}

export default async function(options) {
  ensureBuildFoldersExist();

  options = options || {};

  const builders = [];

  if (!options.skipPages) {
    builders.push(buildPages());
  }

  if (!options.skipWebpack) {
    builders.push(buildWebpack(options));
  }

  await* builders;
}
