import {writeFileSync} from 'fs';
import webpack from 'webpack';
import generateWebpackConfig from './generateWebpackConfig';
import {Promise} from 'es6-promise';

import Builder from './Builder';

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

export default class WebpackBuilder extends Builder {
  constructor() {
    super();

    this.description = 'building Webpack bundle';
  }

  async build(options) {
    const stats = await runWebpack(options.optimize);

    const jsonStats = stats.toJson();

    if (options.logWebpack) {
      writeFileSync('./webpack.log.json', JSON.stringify(jsonStats, null, 2), {encoding: 'utf-8'});
    }

    this.jsonStats = jsonStats;
  }

  renderErrors() {
    if (this.didError) {
      super.renderErrors();

    } else {
      const jsonStats = this.jsonStats;

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
    }
  }
}
