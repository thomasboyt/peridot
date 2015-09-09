import logUpdate from 'log-update';

export default class BuilderManager {
  constructor(options) {
    this.builders = [];
    this.options = options;
  }

  addBuilder(Builder) {
    this.builders.push(new Builder());
  }

  async build() {
    this.renderProgress();

    await* this.builders.map(async (builder) => {
      await builder.wrappedBuild(this.options);
      this.renderProgress();
    });

    logUpdate.done();
  }

  renderBuilderProgress(builder) {
    let progress = '';
    if (builder.done) {
      progress += 'Done!';
    } else if (builder.didError) {
      progress += 'ERROR';
    }

    if (builder.time !== null) {
      progress += ` (${builder.time} s)`;
    }

    return progress;
  }

  renderProgress() {
    const lines = this.builders.map((builder) => {
      const progress = this.renderBuilderProgress(builder);
      return `${builder.description}... ${progress}`;
    }).join('\n');

    logUpdate(lines);
  }

  renderErrors() {
    for (let builder of this.builders) {
      builder.renderErrors();
    }
  }
}

