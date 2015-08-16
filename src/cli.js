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
  .option('--skip-webpack', 'don\'t build frontend assets through webpack')
  .option('--skip-pages', 'don\'t build static HTML or JSON')
  .option('--optimize', 'minify Webpack bundle')
  .action(build);

app.command('serve')
  .description('Build and serve files')
  .action(serve);

app.parse(process.argv);

// No subcommand was passed
if (!process.argv.slice(2).length) {
  app.outputHelp();
}
