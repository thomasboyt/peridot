import path from 'path';
import chokidar from 'chokidar';
import pathIsInside from 'path-is-inside';

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

  // Non-absolute paths are relative to cwd
  let absPath;
  if (!path.isAbsolute(changedPath)) {
    absPath = path.join(process.cwd(), changedPath);
  } else {
    absPath = changedPath;
  }

  const stylesDir = path.join(process.cwd(), 'styles');

  if (changedPath === '_entries.yml') {
    await build(['entries', 'pages']);
  } else if (pathIsInside(absPath, stylesDir)) {
    await build(['webpack']);
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

    // watch Peridot app folder
    path.join(__dirname, '../../app')
  ], {
    // ignore dotfiles
    ignored: /[\/\\]\./,

    // don't build on initial file add
    ignoreInitial: true
  }).on('all', (...args) => errorWrap(rebuildOrQueue, ...args));
}
