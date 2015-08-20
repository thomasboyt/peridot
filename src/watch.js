import {join as pathJoin} from 'path';
import {spawn} from 'child_process';
import chokidar from 'chokidar';

import buildWebpack from './builder/buildWebpack';

import {log, enterLogSection, exitLogSection, createProcessLogger} from './util/logger';

const binPath = pathJoin(__dirname, '../bin/nite-flights');

// hmmmm
let queuedPath = null;
let building = false;

function rebuildOrQueue(event, path) {
  queuedPath = path;

  if (!building) {
    rebuild();
  }
}

async function rebuild() {
  const path = queuedPath;

  building = true;
  queuedPath = null;

  log(`File "${path}" changed, rebuilding...`);

  enterLogSection();

  // spawn rebuild so it uses new components/
  // TODO: reject on non-zero code to display an error message warning of some sort
  const buildPagesPromise = new Promise((resolve/*, reject*/) => {
    const proc = spawn(binPath, ['build', '--skip-webpack'], {
      stdio: ['pipe', 'pipe', 'pipe']
    });

    createProcessLogger(proc);

    proc.on('exit', resolve);
  });

  const buildWebpackPromise = buildWebpack();

  await* [buildPagesPromise, buildWebpackPromise];

  exitLogSection();

  log('...Done!');
  log('');

  if (queuedPath) {
    rebuild();
  } else {
    building = false;
  }
}

export default function watch() {
  chokidar.watch([
    '_entries.yml',
    'app/',
    pathJoin(__dirname, '../app')
  ], {
    // ignore dotfiles
    ignored: /[\/\\]\./,

    // don't build on initial file add
    ignoreInitial: true
  }).on('all', rebuildOrQueue);
}
