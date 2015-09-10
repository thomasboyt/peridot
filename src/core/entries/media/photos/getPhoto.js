import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import getConverter from './getConverter';

import {getPhotoHash, addPhotoHash} from './photoCache';

import getSettings from '../../../../settings';

function getCachePath(filename) {
  return `./_cache/photos/${filename}`;
}

function resizeAndSave(srcPath, destPath, width, height) {
  return new Promise((resolve, reject) => {
    getConverter()(srcPath)
      .resize(width, height, '>')
      .write(destPath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
  });
}

export default async function getPhoto(imgPath) {
  const settings = getSettings();

  const srcPath = path.resolve(path.join(process.cwd(), settings.photos.dir), imgPath);

  let hash = getPhotoHash(srcPath);
  let cached = !!hash;

  if (!cached) {
    // Get hash of photo
    const sum = crypto.createHash('md5');
    sum.update(fs.readFileSync(srcPath, {encoding: 'binary'}));
    hash = sum.digest('hex');

    addPhotoHash(srcPath, hash);
  }

  // Build dictionary of sizes to urls:
  // {
  //   sizes: {
  //     large: "/assets/photos/hash:large.jpg",
  //     small: "/assets/photos/hash:small.jpg"
  //   }
  // }

  const sizes = {};

  for (let sizeName in settings.photos.sizes) {
    const {w, h} = settings.photos.sizes[sizeName];

    const filename = `${hash}:${sizeName}${path.extname(imgPath)}`;
    sizes[sizeName] = `/assets/photos/${filename}`;

    const cachePath = getCachePath(filename);

    // If a cached version doesn't exist, import it
    if (!cached) {
      await resizeAndSave(srcPath, cachePath, w, h);
    }
  }

  // Return img data
  return {sizes};
}
