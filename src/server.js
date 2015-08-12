import express from 'express';
import chokidar from 'chokidar';
import {spawn} from 'child_process';

import build from './builder';

function rebuild(event, path) {
  console.log('File changed:', path);

  // spawn rebuild
  spawn('bin/nite-flights', ['build'], {
    stdio: [process.stdin, process.stdout, process.stderr, 'pipe']
  });
}

export default async function serve() {
  const app = express();

  await build();

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
}
