import {statSync} from 'fs';

export default function exists(path) {
  try {
    statSync(path);
    return true;
  } catch(err) {
    if (err.code === 'ENOENT') {
      return false;
    }

    throw err;
  }
}
