import {writeFileSync} from 'fs';
import webpack from 'webpack';
import generateWebpackConfig from './generateWebpackConfig';
import {Promise} from 'es6-promise';
import {log} from '../util/logger';

let compiler;

function runWebpack(optimize = false) {
  // Lazily instantiate the compiler on first run
  if (!compiler) {
    const config = generateWebpackConfig(optimize);
    compiler = webpack(config);
  }

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

export default async function buildWebpack(options = {}) {
  log('Starting Webpack build...');

  let stats;

  try {
    stats = await runWebpack(options.optimize);

  } catch(err) {
    log('Unhandled fatal error in Webpack build:');
    log(err.stack);
    return;
  }

  const jsonStats = stats.toJson();

  if (options.logWebpack) {
    writeFileSync('./webpack.log.json', JSON.stringify(jsonStats, null, 2), {encoding: 'utf-8'});
  }

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

  const time = jsonStats.time / 1000;

  log(`Finished Webpack build (${time} s)`);
}


