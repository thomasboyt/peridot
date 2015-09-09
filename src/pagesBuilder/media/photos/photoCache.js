import {readFileSync, writeFileSync} from 'fs';
import _ from 'lodash';

import getSettings from '../../../settings';

const cachePath = `_cache/photos.json`;

let cache = null;

function getEmptyCache(sizes) {
  return {
    photos: {},
    sizes
  };
}

export function loadPhotoCache() {
  const sizes = getSettings().photos.sizes;

  let cacheJson;

  try {
    cacheJson = readFileSync(cachePath, {encoding: 'utf8'});
  } catch(err) {
    cache = getEmptyCache(sizes);
    return;
  }

  cache = JSON.parse(cacheJson);

  // Bust photos cache if specified resize sizes have changed
  if (!_.isEqual(sizes, cache.sizes)) {
    console.log('*** Busted photo cache due to changed sizes');
    cache = getEmptyCache(sizes);
  }
}

export function getPhotoHash(path) {
  if (cache === null) {
    throw new Error('Call `loadPhotoCache()` before attempting to get a photo');
  }

  return cache.photos[path];
}

export function addPhotoHash(path, hash) {
  cache.photos[path] = hash;
}

export function savePhotoCache() {
  const str = JSON.stringify(cache);
  writeFileSync(cachePath, str, {encoding: 'utf8'});
}
