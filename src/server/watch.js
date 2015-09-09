import {join as pathJoin} from 'path';
import {spawn} from 'child_process';
import chokidar from 'chokidar';

import build from '../builder';

import {createProcessLogger} from '../util/logger';

const binPath = pathJoin(__dirname, '../../bin/peridot');

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

  console.log(`File "${path}" changed...`);

  // spawn rebuild so it uses new components/
  // TODO: reject on non-zero code to display an error message warning of some sort
  const buildPagesPromise = new Promise((resolve/*, reject*/) => {
    const proc = spawn(binPath, ['build', '--skip-webpack', '--skip-copy'], {
      stdio: ['pipe', 'pipe', 'pipe']
    });

    createProcessLogger(proc);

    proc.on('exit', resolve);
  });

  const buildWebpackPromise = build({
    skipPages: true,
    skipCopy: true
  });

  await* [buildPagesPromise, buildWebpackPromise];

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
    'styles/',
    pathJoin(__dirname, '../app')
  ], {
    // ignore dotfiles
    ignored: /[\/\\]\./,

    // don't build on initial file add
    ignoreInitial: true
  }).on('all', rebuildOrQueue);
}
