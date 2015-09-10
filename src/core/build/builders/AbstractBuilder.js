import EventEmitter from 'events';

export default class Builder {
  constructor() {
    this.done = false;
    this.didError = false;
    this.logMsgs = [];
    this.time = null;

    this._evt = new EventEmitter();
  }

  log(msg) {
    this.logMsgs.push(msg);
  }

  waitFor() {
    return new Promise((resolve, reject) => {
      if (this.done) {
        resolve();
      } else if (this.didError ){
        reject();
      }

      this._evt.once('done', resolve);
      this._evt.once('err', reject);
    });
  }

  async wrappedBuild(options) {
    const startTime = new Date();

    try {
      await this.build(options);
      this.done = true;
      this._evt.emit('done');

    } catch(err) {
      await this.handleError(err);
      this.didError = true;
      this._evt.emit('err');
    }

    const endTime = new Date();

    this.time = (endTime - startTime) / 1000;
  }

  async handleError(err) {
    if (err.stack) {
      // JS errors
      this.log(err.stack);

    } else {
      // Other error
      this.log(err);
    }
  }

  renderErrors() {
    if (this.didError) {
      console.error(`Unhandled error ${this.description}:`);

      for (let msg of this.logMsgs) {
        console.error(`${msg}`);
      }
    }
  }
}

