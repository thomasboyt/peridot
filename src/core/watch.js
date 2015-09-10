import path from 'path';
import chokidar from 'chokidar';

import errorWrap from '../util/errorWrap';
import build from './build';

// hmmmm
let queuedPath = null;
let building = false;

async function rebuildOrQueue(event, changedPath) {
  queuedPath = changedPath;

  if (!building) {
    await rebuild();
  }
}

async function rebuild() {
  const changedPath = queuedPath;

  building = true;
  queuedPath = null;

  console.log(`File "${changedPath}" changed...`);

  // TODO: only run subset based on changes
  if (path.relative(process.cwd(), changedPath) === '_entries.yml') {
    await build(['entries', 'pages']);
  } else {
    await build(['pages', 'webpack']);
  }

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
    path.join(__dirname, '../app')
  ], {
    // ignore dotfiles
    ignored: /[\/\\]\./,

    // don't build on initial file add
    ignoreInitial: true
  }).on('all', (...args) => errorWrap(rebuildOrQueue, ...args));
}
