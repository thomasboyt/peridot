import {readFileSync, writeFileSync} from 'fs';
import {sync as mkdirp} from 'mkdirp';

function getCacheTypeDir(type) {
  return `./_cache/${type}`;
}

function getCachePath(type, id) {
  return `./_cache/${type}/${id}.json`;
}

function getCache(type, id) {
  try {
    return JSON.parse(readFileSync(getCachePath(type, id), {encoding: 'utf8'}));
  } catch(err) {
    return undefined;
  }
}

function cacheMedia(type, id, data) {
  mkdirp(getCachePath(type));

  const str = JSON.stringify(data);
  writeFileSync(getCachePath(type, id), str, {encoding: 'utf8'});
}

export default async function getMedia(urls) {
  const media = {};
  const queue = [];

  urls.forEach((url) => {
    const {type, id} = getMediaInfo(url);
    const cached = getCache(type, id);

    if (cached) {
      media[url] = cached;
    } else {
      queue.push({
        type: type,
        id: id,
        url: url
      });
    }
  });

  if (queue.length === 0) {
    // No uncached media to fetch
    return media;
  }

  const fetchedMedia = await fetchMedia(queue);

  fetchedMedia.forEach((media) => {
    const {type, id, url, data} = media;
    cacheMedia(type, id, data);
    media[url] = data;
  });

  return media;
}
