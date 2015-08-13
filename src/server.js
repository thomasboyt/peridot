import express from 'express';
import chokidar from 'chokidar';
import {spawn} from 'child_process';
import {join as pathJoin} from 'path';

import build from './builder';
import buildWebpack from './builder/buildWebpack';

function rebuild(event, path) {
  console.log('File changed:', path);

  // spawn rebuild so it uses new components/
  spawn(pathJoin(__dirname, '../bin/nite-flights'), ['build', '--skip-webpack'], {
    stdio: [process.stdin, process.stdout, process.stderr, 'pipe']
  });

  buildWebpack();
}

export default async function serve() {
  const app = express();

  await build({
    skipWebpack: true
  });

  app.use(express.static('_site/'));
  app.use(express.static('public/'));

  const server = app.listen(3000, function () {
    const host = server.address().address;
    const port = server.address().port;

    console.log('Listening at http://%s:%s', host, port);
  });

  chokidar.watch([
    '_entries.yml',
    'components/'
  ], {
    ignored: /[\/\\]\./,
    ignoreInitial: true
  }).on('all', rebuild);

  buildWebpack();
}
