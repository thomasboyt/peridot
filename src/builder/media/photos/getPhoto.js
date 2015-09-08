import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import getConverter from './getConverter';

import exists from '../../../util/exists';

function getCachePath(filename) {
  return `./_cache/photos/${filename}`;
}

function resizeAndSave(srcPath, destPath) {
  return new Promise((resolve, reject) => {
    getConverter()(srcPath)
      .resize(1024, 1024, '>')
      .write(destPath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
  });
}

/*
 * Import a local photo, using the max size setting and resizing down as appropriate.
 */
async function importPhoto(srcPath, destPath) {
  await resizeAndSave(srcPath, destPath);
}

export default async function getPhoto(imgPath) {
  const srcPath = path.resolve(path.join(process.cwd(), 'photos'), imgPath);

  // Get hash of photo
  const sum = crypto.createHash('md5');
  sum.update(fs.readFileSync(srcPath, {encoding: 'binary'}));
  const hexSum = sum.digest('hex');

  const filename = `${hexSum}${path.extname(imgPath)}`;

  const cachePath = getCachePath(filename);

  if (!exists(cachePath)) {
    await importPhoto(srcPath, cachePath);
  }

  // Return img data
  return {
    url: `/assets/photos/${filename}`
  };
}
