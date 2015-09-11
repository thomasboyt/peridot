import {join as pathJoin} from 'path';
import {spawn} from 'child_process';

import AbstractBuilder from './AbstractBuilder';

const binPath = pathJoin(__dirname, '../../../../bin/peridot-build-pages');

function spawnBuildPages() {
  return new Promise((resolve, reject) => {
    const proc = spawn(binPath, [], {
      stdio: ['pipe', 'pipe', 'pipe']
    });

    proc.on('exit', (code) => {
      if (code !== 0) {
        const err = proc.stderr.read() || '';
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export default class PagesBuilder extends AbstractBuilder {
  constructor() {
    super();

    this.depends = 'entries';
    this.description = 'building pages';
  }

  async build(/*options*/) {
    await spawnBuildPages();
  }
}
