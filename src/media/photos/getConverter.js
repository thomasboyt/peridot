import {execSync} from 'child_process';
import gm from 'gm';

let converter;
export default function getConverter() {
  if (converter !== undefined) {
    return converter;
  }

  try {
    execSync('gm version', {stdio: [null, null, null]});
    return converter;

  } catch(err) {
    if (err.status !== 127) {
      throw err;
    }
  }

  try {
    execSync('convert -version', {stdio: [null, null, null]});
    converter = gm.subClass({imageMagick: true});
    return converter;

  } catch(err) {
    if (err.status !== 127) {
      throw err;
    }
  }

  throw new Error('Please install either ImageMagick or GraphicsMagick for photo resize support.');
}
