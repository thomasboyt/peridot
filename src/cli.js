import app from 'commander';
const pkg = require('../package.json');

/*
 * Top-level error handler for async functions.
 *
 * Various subcommands have custom error handlers for prettier errors & preventing exit
 */
async function errorWrap(cb, ...args) {
  /* eslint no-process-exit: 0 */

  try {
    await cb(...args);
  } catch(err) {
    if (err.stack) {
      // JS errors
      console.log(err.stack);
    } else {
      // Other error
      console.log(err);
    }

    process.exit(1);
  }
}

app
  .version(pkg.version);

app.command('new <path>')
  .description('Create new blog using the default template at [path]')
  .option('--force', 'Overwrite existing files at [path]')
  .action((...args) => {
    const generate = require('./generator');
    errorWrap(generate, ...args);
  });

app.command('build')
  .description('Build files to _site/')
  .option('--optimize', 'minify Webpack bundle')
  .option('--skip-webpack', 'don\'t build frontend assets through webpack')
  .option('--skip-pages', 'don\'t build static HTML or JSON')
  .option('--skip-copy', 'don\'t copy static files to _site/')
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
