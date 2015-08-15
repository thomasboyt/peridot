import {join as pathJoin} from 'path';
import {spawn} from 'child_process';
import chokidar from 'chokidar';

import buildWebpack from './builder/buildWebpack';

import {log, enterSection, exitSection, createProcessLogger} from './util/logger';

async function rebuild(event, path) {
  log(`File changed: ${path}`);

  enterSection();

  // spawn rebuild so it uses new components/
  const filesRebuild = new Promise((resolve/*, reject*/) => {
    const proc = spawn(pathJoin(__dirname, '../bin/nite-flights'), ['build', '--skip-webpack'], {
      stdio: ['pipe', 'pipe', 'pipe']
    });

    createProcessLogger(proc);

    proc.on('exit', resolve);
  });

  await* [filesRebuild, buildWebpack()];

  exitSection();

  log('Rebuild complete.');
}

export default function watch() {
  chokidar.watch([
    '_entries.yml',
    'components/'
  ], {
    ignored: /[\/\\]\./,
    ignoreInitial: true
  }).on('all', rebuild);
}
