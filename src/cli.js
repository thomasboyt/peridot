import app from 'commander';
const pkg = require('../package.json');

app
  .version(pkg.version);

app.command('build')
  .description('Build files to _site/')
  .option('--skip-webpack', 'don\'t build frontend assets through webpack')
  .option('--skip-pages', 'don\'t build static HTML or JSON')
  .option('--optimize', 'minify Webpack bundle')
  .option('--log-webpack', 'log Webpack stats to webpack.log.json')
  .action((...args) => {
    const build = require('./builder');
    build(...args);
  });

app.command('serve')
  .description('Build and serve files')
  .action((...args) => {
    const serve = require('./server');
    serve(...args);
  });

app.parse(process.argv);

// No subcommand was passed
if (!process.argv.slice(2).length) {
  app.outputHelp();
}
