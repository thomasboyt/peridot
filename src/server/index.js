import express from 'express';
import {log} from '../util/logger';

import build from '../builder';
import watch from './watch';

export default async function serve(options) {
  await build({
    skipCopy: true
  });

  const app = express();

  app.use(express.static('_site/'));
  app.use(express.static('public/'));
  app.use('/assets/photos', express.static('_cache/photos/'));

  const server = app.listen(options.port, () => {
    const host = server.address().address;
    const port = server.address().port;

    log(`Listening at http://${host}:${port}`);
  });

  watch();
}
