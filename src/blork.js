import app from 'commander';
const pkg = require('../package.json');

import build from './builder';

app
  .version(pkg.version);

app.command('build')
  .description('Build files to _site/')
  .action(build);

app.parse(process.argv);
