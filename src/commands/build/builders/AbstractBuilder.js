export default class Builder {
  constructor() {
    this.done = false;
    this.didError = false;
    this.logMsgs = [];
    this.time = null;
  }

  log(msg) {
    this.logMsgs.push(msg);
  }

  async wrappedBuild(options) {
    const startTime = new Date();

    try {
      await this.build(options);
      this.done = true;

    } catch(err) {
      await this.handleError(err);
      this.didError = true;
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

