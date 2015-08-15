import webpack from 'webpack';
import generateWebpackConfig from './generateWebpackConfig';
import {Promise} from 'es6-promise';

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
  console.log('Starting Webpack build...');

  let stats;

  try {
    stats = await runWebpack();

  } catch(err) {
    console.log('Unhandled fatal error in Webpack build:');
    console.log(err.stack);
    return;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.errors.length > 0) {
    console.log('*** Webpack errors:');
    jsonStats.errors.map((err) => {
      console.log(err);
      console.log('');
    });
  }

  if (jsonStats.warnings.length > 0) {
    console.log('*** Webpack warnings:');
    jsonStats.warnings.map((err) => {
      console.log(err);
      console.log('');
    });
  }

  console.log('Finished Webpack build');
}


