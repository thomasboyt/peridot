import _ from 'lodash';

import logUpdate from 'log-update';
import elegantSpinner from 'elegant-spinner';
import chalk from 'chalk';

import PagesBuilder from './builders/PagesBuilder';
import WebpackBuilder from './builders/WebpackBuilder';
import CopyBuilder from './builders/CopyBuilder';
import EntriesBuilder from './builders/EntriesBuilder';

const builders = {
  entries: EntriesBuilder,
  pages: PagesBuilder,
  copy: CopyBuilder,
  webpack: WebpackBuilder
};

const spinner = elegantSpinner();

export default class BuilderManager {
  constructor(enabledBuilders=[]) {
    if (!enabledBuilders.length) {
      throw new Error('At least one builder must be specified');
    }

    this.builders = {};

    for (let name of enabledBuilders) {
      const Builder = builders[name];

      if (!Builder) {
        throw new Error(`No builder named ${name}`);
      }

      this.builders[name] = new Builder();
    }
  }

  async build(options) {
    this.renderProgress();

    this._startRender();

    await* _.map(this.builders, async (builder) => {
      const dependsOn = this.builders[builder.depends];

      let waitFor;
      if (dependsOn) {
        builder.waiting = true;
        this.renderProgress();

        await dependsOn.waitFor();

        builder.waiting = false;
        this.renderProgress();
      }

      await builder.wrappedBuild(options, waitFor);

      this.renderProgress();
    });

    this._stopRender();
  }

  _startRender() {
    this._renderInterval = setInterval(() => this.renderProgress(), 100);
  }

  _stopRender() {
    clearInterval(this._renderInterval);
    logUpdate.done();
  }

  renderBuilderProgress(builder, frame) {
    let progress = '';

    if (builder.done) {
      progress = chalk.green('Done!');
    } else if (builder.didError) {
      progress = chalk.bold.red('Error');
    } else if (!builder.waiting) {
      progress = frame;
    }

    if (builder.time !== null) {
      progress += ` (${builder.time} s)`;
    }

    return progress;
  }

  renderProgress() {
    const frame = spinner();

    const lines = _.map(this.builders, (builder) => {
      const progress = this.renderBuilderProgress(builder, frame);

      return `${_.padLeft(_.capitalize(builder.description), 30)}... ${progress}`;
    }).join('\n');

    logUpdate(lines);
  }

  renderErrors() {
    _.each(this.builders, (builder) => {
      builder.renderErrors();
    });
  }
}

