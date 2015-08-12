import {sync as mkdirpSync} from 'mkdirp';
mkdirpSync('_cache');
mkdirpSync('_site/entries');


import app from 'commander';
const pkg = require('../package.json');

import build from './builder';
import serve from './server';

app
  .version(pkg.version);

app.command('build')
  .description('Build files to _site/')
  .action(build);

app.command('serve')
  .description('Build and serve files')
  .action(() => {
    build().then(serve);
  });

app.parse(process.argv);