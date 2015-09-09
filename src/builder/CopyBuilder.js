import cpr from 'cpr';

import Builder from './Builder';

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

export default class CopyBuilder extends Builder {
  constructor() {
    super();

    this.description = 'copying files';
  }

  async build(/*options*/) {
    await cprP('_cache/photos', '_site/assets/photos');
    await cprP('public/', '_site/');
  }
}
