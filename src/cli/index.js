import app from 'commander';

import errorWrap from '../util/errorWrap';
import {intOpt} from './optTypes';

const pkg = require('../../package.json');

app
  .version(pkg.version);

app.command('new <path>')
  .description('Create new blog using the default template at [path]')
  .option('-f, --force', 'Overwrite existing files at [path]')
  .option('--npm-install', 'Run NPM install')
  .action((...args) => {
    const generate = require('./commands/new');
    errorWrap(generate, ...args);
  });

app.command('build')
  .description('Build files to _site/')
  .option('-o, --optimize', 'minify Webpack bundle')
  .option('--skip-webpack', 'don\'t build frontend assets through webpack')
  .option('--skip-pages', 'don\'t build static HTML or JSON')
  .option('--skip-copy', 'don\'t copy static files to _site/')
  .option('--log-webpack', 'log Webpack stats to webpack.log.json')
  .action((...args) => {
    const build = require('./commands/build');
    errorWrap(build, ...args);
  });

app.command('serve')
  .description('Build and serve files')
  .option('-p, --port <port>', 'port to serve on (defaults to 3000)', intOpt('port'), 3000)
  .action((...args) => {
    const serve = require('./commands/serve');
    errorWrap(serve, ...args);
  });

app.parse(process.argv);

// No subcommand was passed
if (!process.argv.slice(2).length) {
  app.outputHelp();
}
