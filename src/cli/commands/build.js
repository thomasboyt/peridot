import _ from 'lodash';

import build from '../../core/build';

export default async function buildCmd(options = {}) {
  const builders = {
    entries: !options.skipEntries,
    pages: !options.skipPages,
    copy: !options.skipCopy,
    webpack: !options.skipWebpack
  };

  const enabledBuilders = _.filter(_.keys(builders), (key) => builders[key] === true);

  await build(enabledBuilders, options);
}
