import express from 'express';

import build from './build';
import watch from '../watch';

export default async function serve() {
  await build({
    skipCopy: true
  });

  const app = express();

  app.use(express.static('_site/'));
  app.use(express.static('public/'));
  app.use('/assets/photos', express.static('_cache/photos/'));

  const server = app.listen(3000, function () {
    const host = server.address().address;
    const port = server.address().port;

    console.log(`Listening at http://${host}:${port}\n`);
  });

  watch();
}
