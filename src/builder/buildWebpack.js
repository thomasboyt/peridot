import webpack from 'webpack';
import generateWebpackConfig from './generateWebpackConfig';
import {Promise} from 'es6-promise';
import {log} from '../util/logger';

const compiler = webpack(generateWebpackConfig());

function runWebpack() {
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        reject(err);
      } else {
        resolve(stats);
      }
    });
  });
}

// TODO: This currently just returns immediately since I need to promiseify webpack to make it awaitable
export default async function buildWebpack() {
  log('Starting Webpack build...');

  let stats;

  try {
    stats = await runWebpack();

  } catch(err) {
    log('Unhandled fatal error in Webpack build:');
    log(err.stack);
    return;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.errors.length > 0) {
    log('*** Webpack errors:');
    jsonStats.errors.map((err) => {
      log(err);
      log('');
    });
  }

  if (jsonStats.warnings.length > 0) {
    log('*** Webpack warnings:');
    jsonStats.warnings.map((err) => {
      log(err);
      log('');
    });
  }

  log('Finished Webpack build');
}


