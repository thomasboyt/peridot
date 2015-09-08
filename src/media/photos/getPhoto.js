import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import exists from '../../util/exists';

function getCachePath(filename) {
  return `./_cache/photos/${filename}`;
}

/*
 * Import a local photo, using the max size setting and resizing down as appropriate.
 */
function importPhoto(filename, srcPath, destPath) {
  // TODO: Resize
  const content = fs.readFileSync(srcPath, {encoding: 'binary'});
  fs.writeFileSync(destPath, content, {encoding: 'binary'});
}

export default function getPhoto(imgPath) {
  const srcPath = path.resolve(path.join(process.cwd(), 'photos'), imgPath);

  // Get hash of photo
  const sum = crypto.createHash('md5');
  sum.update(fs.readFileSync(srcPath, {encoding: 'binary'}));
  const hexSum = sum.digest('hex');

  const filename = `${hexSum}${path.extname(imgPath)}`;

  const cachePath = getCachePath(filename);

  if (!exists(cachePath)) {
    importPhoto(filename, srcPath, cachePath);
  }

  // Return img data
  return {
    url: `/assets/photos/${filename}`
  };
}
