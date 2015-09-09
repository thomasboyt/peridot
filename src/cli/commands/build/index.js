import PagesBuilder from './builders/PagesBuilder';
import WebpackBuilder from './builders/WebpackBuilder';
import CopyBuilder from './builders/CopyBuilder';

import BuilderManager from './BuilderManager';

export default async function build(options = {}) {
  const manager = new BuilderManager(options);

  if (!options.skipPages) {
    manager.addBuilder(PagesBuilder);
  }

  if (!options.skipCopy) {
    manager.addBuilder(CopyBuilder);
  }

  if (!options.skipWebpack) {
    manager.addBuilder(WebpackBuilder);
  }

  await manager.build();

  manager.renderErrors();
}
