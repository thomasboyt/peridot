import cpr from 'cpr';
import promiseWrap from '../../../util/promiseWrap';

import AbstractBuilder from './AbstractBuilder';

const cprP = promiseWrap(cpr);

export default class CopyBuilder extends AbstractBuilder {
  constructor() {
    super();

    this.description = 'copying files';
  }

  async build(/*options*/) {
    await cprP('_cache/photos', '_site/assets/photos');
    await cprP('public/', '_site/');
  }
}
