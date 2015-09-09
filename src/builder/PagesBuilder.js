import {join as pathJoin} from 'path';
import {spawn} from 'child_process';

import Builder from './Builder';

const binPath = pathJoin(__dirname, '../../bin/peridot-build-pages');

function spawnBuildPages() {
  return new Promise((resolve, reject) => {
    const proc = spawn(binPath, [], {
      stdio: ['pipe', 'pipe', 'pipe']
    });

    proc.on('exit', (code) => {
      if (code !== 0) {
        reject(proc.stderr.read());
      } else {
        resolve();
      }
    });
  });
}

export default class PagesBuilder extends Builder {
  constructor() {
    super();

    this.description = 'building pages';
  }

  async build(/*options*/) {
    await spawnBuildPages();
  }
}
