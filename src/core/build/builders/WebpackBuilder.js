import {writeFileSync} from 'fs';
import webpack from 'webpack';
import promiseWrap from '../../../util/promiseWrap';

import generateWebpackConfig from '../../generateWebpackConfig';
import AbstractBuilder from './AbstractBuilder';

let compiler;

function runWebpack(optimize = false) {
  // Lazily instantiate the compiler on first run
  if (!compiler) {
    const config = generateWebpackConfig(optimize);
    compiler = webpack(config);
  }

  return promiseWrap(compiler.run.bind(compiler))();
}

export default class WebpackBuilder extends AbstractBuilder {
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
