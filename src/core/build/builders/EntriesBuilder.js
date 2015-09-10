import AbstractBuilder from './AbstractBuilder';

import buildEntries from '../../entries/buildEntries';

export default class EntriesBuilder extends AbstractBuilder {
  constructor() {
    super();

    this.description = 'loading entries';
  }

  async build(options) {
    await buildEntries();
  }
}
