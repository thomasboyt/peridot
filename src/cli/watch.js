import {join as pathJoin} from 'path';
import chokidar from 'chokidar';

import build from './commands/build';

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

  await build({
    skipCopy: true
  });

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
