import cpr from 'cpr';

import {log} from '../util/logger';

function cprP(...args) {
  return new Promise((resolve, reject) => {
    cpr(...args, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}

export default async function buildCopy() {
  log('Copying static files...');

  await cprP('_cache/photos', '_site/assets/photos');
  await cprP('public/', '_site/');

  log('Finished copying files');
}
